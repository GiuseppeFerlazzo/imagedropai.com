"use client";

import { FormEvent, Suspense, useState } from "react";
/* import { auth0 } from "@/lib/auth0"; */
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  /* const session = await auth0.getSession(); */
  async function generateImage(event: FormEvent) {
    event.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");
    setImage(null);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setImage(data.image);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to generate image",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Suspense fallback={<p>loading</p>}>
      {" "}
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px 20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>AI Image Generator</h1>

        <form onSubmit={generateImage}>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Describe the image you want to create..."
            rows={5}
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              marginBottom: "15px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

        {image && (
          <div style={{ marginTop: "30px" }}>
            <h2>Generated Image</h2>

            <img
              src={image}
              alt={prompt}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        )}
      </main>
    </Suspense>
  );
}
