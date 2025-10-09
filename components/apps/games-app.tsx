export default function GamesApp() {
  return (
    <div className="p-4 font-sans h-full flex flex-col">
      <h1 className="text-xl font-bold mb-4 text-[#000080]">Classic DOS Games</h1>
      <div className="win98-inset flex-1 bg-black text-green-400 p-4 font-mono text-sm">
        <p className="mb-2">JS-DOS Emulator</p>
        <p className="mb-4 text-xs text-gray-400">
          Note: JS-DOS integration would go here. For now, this is a placeholder.
        </p>
        <div className="space-y-2">
          <div className="win98-outset bg-[#c0c0c0] p-2 text-black text-xs cursor-pointer hover:bg-[#000080] hover:text-white">
            🎮 DOOM (1993)
          </div>
          <div className="win98-outset bg-[#c0c0c0] p-2 text-black text-xs cursor-pointer hover:bg-[#000080] hover:text-white">
            🎮 Prince of Persia (1989)
          </div>
          <div className="win98-outset bg-[#c0c0c0] p-2 text-black text-xs cursor-pointer hover:bg-[#000080] hover:text-white">
            🎮 Commander Keen (1990)
          </div>
        </div>
      </div>
    </div>
  )
}
