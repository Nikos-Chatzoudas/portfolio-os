export default function AboutApp() {
  return (
    <div className="p-4 font-sans">
      <div className="win98-outset p-4 bg-[#c0c0c0]">
        <div className="flex gap-4 mb-4">
          <div className="text-6xl">💻</div>
          <div>
            <h1 className="text-lg font-bold mb-1">Windows 98 Portfolio</h1>
            <p className="text-xs text-[#808080]">Version 1.0</p>
          </div>
        </div>

        <div className="win98-inset p-3 bg-white mb-4">
          <table className="text-xs w-full">
            <tbody>
              <tr>
                <td className="font-bold pr-4 py-1">System:</td>
                <td>React Desktop Environment</td>
              </tr>
              <tr>
                <td className="font-bold pr-4 py-1">Owner:</td>
                <td>Your Name</td>
              </tr>
              <tr>
                <td className="font-bold pr-4 py-1">Built with:</td>
                <td>Next.js, React, TypeScript</td>
              </tr>
              <tr>
                <td className="font-bold pr-4 py-1">Memory:</td>
                <td>Unlimited RAM</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs mb-4">
          This nostalgic Windows 98-style portfolio showcases projects in a fun, interactive desktop environment.
          Double-click icons to explore!
        </p>

        <div className="flex justify-end">
          <button className="win98-button">OK</button>
        </div>
      </div>
    </div>
  )
}
