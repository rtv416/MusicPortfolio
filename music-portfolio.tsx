'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { Button } from "@/components/ui/button"

const tracks = [
  { id: 'A', audio: 'https://raw.githubusercontent.com/rtv416/MusicPortfolio/main/audio/MpTrack14.mp3' },
  { id: 'B', audio: 'https://raw.githubusercontent.com/rtv416/MusicPortfolio/main/audio/MpTrack5.mp3' },
  { id: 'C', audio: 'https://raw.githubusercontent.com/rtv416/MusicPortfolio/main/audio/MpTrack12.mp3' },
  { id: 'D', audio: 'https://raw.githubusercontent.com/rtv416/MusicPortfolio/main/audio/MpTrack10.mp3' },
  { id: 'E', audio: 'https://raw.githubusercontent.com/rtv416/MusicPortfolio/main/audio/MpTrack7.mp3' },
  { id: 'F', audio: 'https://raw.githubusercontent.com/rtv416/MusicPortfolio/main/audio/MpTrack8.mp3' },
  { id: 'G', audio: 'https://raw.githubusercontent.com/rtv416/MusicPortfolio/main/audio/MpTrack11.mp3' },
]

export default function Component() {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[activeTrackIndex].audio
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [activeTrackIndex, isPlaying])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handlePrevious = () => {
    setActiveTrackIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : tracks.length - 1))
  }

  const handleNext = () => {
    setActiveTrackIndex((prevIndex) => (prevIndex < tracks.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="bg-[#121212] p-8 shadow-lg text-center">
        <h1 className="text-5xl font-bold tracking-tight">Rachel Vincent</h1>
        <p className="text-xl text-gray-400 mt-4">Instrumental music composer specializing in orchestral instrumentation</p>
      </header>

      <main className="flex-grow flex items-center justify-center p-8">
        <div className="bg-[#181818] shadow-lg rounded-lg p-8 w-full max-w-2xl text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Now Playing</h2>
            <p className="text-xl text-gray-400">Track {tracks[activeTrackIndex].id}</p>
          </div>
          <div className="flex justify-center items-center space-x-8">
            <Button
              onClick={handlePrevious}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              aria-label="Previous track"
            >
              <SkipBack size={32} />
            </Button>
            <Button
              onClick={handlePlayPause}
              size="icon"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white w-16 h-16"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </Button>
            <Button
              onClick={handleNext}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              aria-label="Next track"
            >
              <SkipForward size={32} />
            </Button>
          </div>
        </div>
      </main>
      <audio ref={audioRef} />
    </div>
  )
}
