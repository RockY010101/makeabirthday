import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'

// GET /api/cards/[id] - Get a specific card by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // We don't strictly require auth here if the card is published and accessed via slug
    // But since this route is /api/cards/[id] which is typically for the editor, we'll check auth.
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const card = await prisma.card.findUnique({
      where: { id },
      include: {
        scenes: {
          orderBy: { order: 'asc' },
          include: {
            elements: {
              orderBy: { order: 'asc' }
            }
          }
        },
        theme: true
      }
    })

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 })
    }

    if (card.userId !== user?.id && card.status !== 'published') {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ data: card })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT /api/cards/[id] - Update a card's details and full scene/element structure
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    
    // Verify ownership
    const existingCard = await prisma.card.findUnique({ where: { id } })
    if (!existingCard || existingCard.userId !== user.id) {
      return NextResponse.json({ error: 'Card not found or unauthorized' }, { status: 404 })
    }

    // A complete update of a card typically requires replacing scenes/elements, 
    // or updating them individually. For simplicity in MVP, we can update basic card fields here.
    // Deep updating scenes/elements will be handled either via specialized endpoints 
    // or a more complex Prisma transaction.
    
    const { title, recipientName, themeId, status, settings } = body

    const updatedCard = await prisma.card.update({
      where: { id },
      data: {
        title,
        recipientName,
        themeId,
        status,
        settings: settings ? (settings as any) : undefined
      }
    })

    return NextResponse.json({ data: updatedCard })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/cards/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    
    // Verify ownership
    const existingCard = await prisma.card.findUnique({ where: { id } })
    if (!existingCard || existingCard.userId !== user.id) {
      return NextResponse.json({ error: 'Card not found or unauthorized' }, { status: 404 })
    }

    await prisma.card.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
