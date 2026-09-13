import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { v4 as uuidv4 } from 'uuid'

// GET /api/cards - List cards for the authenticated user
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const cards = await prisma.card.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        scenes: {
          include: { elements: true }
        }
      }
    })

    return NextResponse.json({ data: cards })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/cards - Create a new card
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, recipientName } = body

    if (!title || !recipientName) {
      return NextResponse.json({ error: 'Title and recipient name are required' }, { status: 400 })
    }

    // Generate a unique short slug for the URL
    const slug = Math.random().toString(36).substring(2, 8)

    const newCard = await prisma.card.create({
      data: {
        title,
        recipientName,
        slug,
        userId: user.id,
        // Create an initial empty scene
        scenes: {
          create: {
            name: 'Opening Scene',
            order: 0,
            config: {
              background: { type: 'color', value: '#ffffff' },
              transition: { type: 'fade', duration: 0.5 }
            }
          }
        }
      },
      include: { scenes: true }
    })

    return NextResponse.json({ data: newCard }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
