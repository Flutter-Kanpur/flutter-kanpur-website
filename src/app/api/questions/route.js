import { db, admin } from '@/lib/firebase/server/firebase_admin';
import { NextResponse } from 'next/server';

// Helper function to create timestamp
const createTimestamp = () => {
  if (admin && admin.firestore && admin.firestore.Timestamp) {
    return admin.firestore.Timestamp.now();
  }
  // Fallback to ISO string if admin is not available
  return new Date().toISOString();
};

export async function POST(request) {
  try {
    const { questionData } = await request.json();

    // Validate required fields
    if (!questionData || !questionData.title || !questionData.title.trim() ||
      !questionData.body || !questionData.body.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    // Create new question document
    const newQuestion = {
      title: questionData.title.trim(),
      body: questionData.body.trim(),
      author: questionData.author || {
        name: "You",
        profilePicUrl: ""
      },
      createdAt: createTimestamp(),
      tags: questionData.tags || ["Flutter"],
      answers: [],
      views: 0
    };

    // Add to Firestore
    const docRef = await db.collection('questions').add(newQuestion);

    // Return the created question with ID
    return NextResponse.json({
      success: true,
      question: {
        id: docRef.id,
        ...newQuestion,
        createdAt: new Date() // Convert timestamp to JS date
      }
    });

  } catch (error) {
    console.error('Error adding question:', error);
    return NextResponse.json({
      success: false,
      error: 'Server error occurred'
    }, { status: 500 });
  }
}
