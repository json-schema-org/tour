'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getcheckPoint } from '@/lib/progressSaving'


export default function CheckpointRedirect() {
  const router = useRouter()

  useEffect(() => {
    const checkpoint = getcheckPoint()
    if (checkpoint) {
      router.push(`content/${checkpoint}`)
    }
  }, [router])

  return null
}