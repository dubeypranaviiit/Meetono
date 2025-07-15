'use client'

import {
  FaWhatsapp,
  FaTelegramPlane,
  FaEnvelope,
  FaSnapchatGhost,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaShareAlt,
} from 'react-icons/fa'

import { Button } from './ui/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from './ui/popover' // shadcn popover

type Props = {
  url: string
}

const shareText = 'Join my meeting on Meetono!'

export const SocialShare = ({ url }: Props) => {
  const encodedURL = encodeURIComponent(url)
  const encodedText = encodeURIComponent(shareText)

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Meetono Meeting',
        text: shareText,
        url,
      })
    } else {
      alert('Sharing not supported on this device')
    }
  }

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button className="bg-dark-3 hover:bg-dark-4">
          <FaShareAlt className="mr-2" /> Share
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[320px] flex flex-col gap-2 bg-dark-2 text-white p-4 rounded-xl shadow-lg">
        <Button className="bg-green-600 hover:bg-green-700" onClick={() =>
          window.open(`https://wa.me/?text=${encodedText}%20${encodedURL}`, '_blank')
        }>
          <FaWhatsapp className="mr-2" /> WhatsApp
        </Button>

        <Button className="bg-blue-500 hover:bg-blue-600" onClick={() =>
          window.open(`https://t.me/share/url?url=${encodedURL}&text=${encodedText}`, '_blank')
        }>
          <FaTelegramPlane className="mr-2" /> Telegram
        </Button>

        <Button className="bg-rose-500 hover:bg-rose-600" onClick={() =>
          window.location.href = `mailto:?subject=Meetono Invitation&body=${encodedText}%0A${encodedURL}`
        }>
          <FaEnvelope className="mr-2" /> Email
        </Button>

        <Button className="bg-blue-700 hover:bg-blue-800" onClick={() =>
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`, '_blank')
        }>
          <FaFacebookF className="mr-2" /> Facebook
        </Button>

        <Button className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90" onClick={() =>
          window.open('https://www.instagram.com/', '_blank')
        }>
          <FaInstagram className="mr-2" /> Instagram
        </Button>

        <Button className="bg-sky-700 hover:bg-sky-800" onClick={() =>
          window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedText}`, '_blank')
        }>
          <FaLinkedinIn className="mr-2" /> LinkedIn
        </Button>

        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black" onClick={() =>
          window.open(`https://www.snapchat.com/scan?attachmentUrl=${encodedURL}`, '_blank')
        }>
          <FaSnapchatGhost className="mr-2" /> Snapchat
        </Button>

        <Button className="bg-dark-3 hover:bg-dark-4" onClick={handleNativeShare}>
          <FaShareAlt className="mr-2" /> Native Share
        </Button>
      </PopoverContent>
    </Popover>
  )
}
