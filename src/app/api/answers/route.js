import { db, admin } from '@/lib/firebase/firebase_admin';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { questionId, answerData } = await request.json();
    
    // Validate the required fields
    if (!questionId || !answerData || !answerData.answerText || !answerData.answerText.trim()) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid or empty answer' 
      }, { status: 400 });
    }
    
    const questionRef = db.collection('questions').doc(questionId);
    const questionDoc = await questionRef.get();
    
    if (!questionDoc.exists) {
      return NextResponse.json({ 
        success: false, 
        error: 'Question not found' 
      }, { status: 404 });
    }
    
    const questionData = questionDoc.data();
    
 let currentAnswers = questionData.answers || [];
    
    if (!Array.isArray(currentAnswers)) {
      currentAnswers = currentAnswers.answerText ? 
        [{
          answerText: currentAnswers.answerText,
          author: currentAnswers.author || {},
          createdAt: currentAnswers.createdAt || admin.firestore.Timestamp.now(),
          views: currentAnswers.views || 0
        }] : [];
    }
    
    // Add new answer to the array
    currentAnswers.push({
      answerText: answerData.answerText,
      author: answerData.author,
      createdAt: admin.firestore.Timestamp.now(),
      views: 0
    });
    
    // Update the document with the new answers array
    await questionRef.update({
      answers: currentAnswers
    });
    
    // Format the newly added answer for the client
    const newAnswerForClient = {
      answerText: answerData.answerText,
      author: answerData.author,
      createdAt: new Date(), // Convert Firestore timestamp to JavaScript Date
      views: 0
    };
    
    return NextResponse.json({ 
      success: true, 
      answer: newAnswerForClient 
    });
  } catch (error) {
    console.error('Error adding answer to question:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
