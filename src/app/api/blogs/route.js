import { db, admin } from "@/lib/firebase/server/firebase_admin";
import { NextResponse } from "next/server";

// Safe timestamp creator
const createTimestamp = () => {
  if (admin?.firestore?.Timestamp) {
    return admin.firestore.Timestamp.now();
  }
  return new Date().toISOString();
};

export async function POST(request) {
  try {
    const { blogData } = await request.json();

    // Validation
    if (
      !blogData ||
      !blogData.title?.trim() ||
      !blogData.author?.trim() ||
      !blogData.body?.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newBlog = {
      title: blogData.title.trim(),
      subtitle: blogData.subtitle || "",
      author: blogData.author.trim(),
      author_image: blogData.author_image || "",
      category: blogData.category || "",
      references: blogData.references || [],
      body: blogData.body.trim(),
      blogBannerURL: blogData.blogBannerURL || "",
      blogURL: blogData.blogURL || "",
      createdAt: createTimestamp(),
    };

    const docRef = await db.collection("blogs").add(newBlog);

    return NextResponse.json({
      success: true,
      blog: {
        id: docRef.id,
        ...newBlog,
        createdAt: new Date(),
      },
    });

  } catch (error) {
    console.error("Error adding blog:", error);

    return NextResponse.json(
      { success: false, error: "Server error occurred" },
      { status: 500 }
    );
  }
}
