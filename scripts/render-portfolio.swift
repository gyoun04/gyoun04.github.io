// macOS: swift -module-cache-path /tmp/portfolio-swift-cache scripts/render-portfolio.swift SOURCE.pdf
import Foundation
import PDFKit
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

guard (2...3).contains(CommandLine.arguments.count),
      let document = PDFDocument(url: URL(fileURLWithPath: CommandLine.arguments[1])) else {
    fatalError("Usage: swift scripts/render-portfolio.swift SOURCE.pdf [OUTPUT_DIRECTORY]")
}
let output = URL(fileURLWithPath: CommandLine.arguments.count == 3 ? CommandLine.arguments[2] : "images/portfolio", isDirectory: true)
let widths = [960, 1920, 2880]
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)
var pages: [[String: Any]] = []
for index in 0..<document.pageCount {
    guard let page = document.page(at: index), let source = page.pageRef else { fatalError("Missing page") }
    let bounds = page.bounds(for: .mediaBox)
    let name = String(format: "page-%02d", index + 1)
    var sizes: [Int: Int] = [:]
    for width in widths {
        let height = Int((CGFloat(width) * bounds.height / bounds.width).rounded())
        guard let context = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8,
            bytesPerRow: width * 4, space: CGColorSpaceCreateDeviceRGB(),
            bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else { fatalError("Cannot render page") }
        let rect = CGRect(x: 0, y: 0, width: width, height: height)
        context.setFillColor(CGColor(gray: 1, alpha: 1))
        context.fill(rect)
        context.interpolationQuality = .high
        context.setAllowsAntialiasing(true)
        context.setShouldAntialias(true)
        // Explicit scaling is required: getDrawingTransform may only center an
        // unscaled PDF page when the destination is larger than the page.
        let scale = min(CGFloat(width) / bounds.width, CGFloat(height) / bounds.height)
        context.translateBy(x: (CGFloat(width) - bounds.width * scale) / 2,
                            y: (CGFloat(height) - bounds.height * scale) / 2)
        context.scaleBy(x: scale, y: scale)
        context.translateBy(x: -bounds.minX, y: -bounds.minY)
        context.drawPDFPage(source)
        guard let image = context.makeImage(),
            let destination = CGImageDestinationCreateWithURL(output.appendingPathComponent("\(name)-\(width).jpg") as CFURL,
                UTType.jpeg.identifier as CFString, 1, nil) else { fatalError("Cannot save page") }
        CGImageDestinationAddImage(destination, image, [kCGImageDestinationLossyCompressionQuality: 0.96] as CFDictionary)
        guard CGImageDestinationFinalize(destination) else { fatalError("JPEG save failed") }
        sizes[width] = height
    }
    pages.append(["number": index + 1, "name": name, "width": widths.last!, "height": sizes[widths.last!]!,
        "text": page.string ?? ""])
    print("Rendered \(index + 1)/\(document.pageCount)")
}
let data = try JSONSerialization.data(withJSONObject: pages, options: [.prettyPrinted, .sortedKeys])
try data.write(to: output.appendingPathComponent("pages.json"))
