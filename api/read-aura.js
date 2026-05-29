export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, zodiac, emotionalState, spotify } = req.body;

  if (!name || !zodiac || !emotionalState) {
    return res
      .status(400)
      .json({ error: "Name, zodiac, and emotional state are required" });
  }
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: buildPrompt(name, zodiac, emotionalState, spotify),
          },
        ],
      }),
    });

    const claudeData = await response.json();
    // console.log('Claude response:', JSON.stringify(claudeData, null, 2))
    const raw = claudeData.content[0].text;
    const reading = JSON.parse(raw);
    return res.status(200).json(reading);
  } catch (err) {
    console.error("Claude API error:", err);
    return res
      .status(500)
      .json({ error: "Reading failed. The angels are unavailable." });
  }
}

function buildPrompt(name, zodiac, emotionalState, spotify) {
  return `You are a mystical aura reading system. Generate a unique aura reading for the following person.

Name: ${name}
Zodiac: ${zodiac}
Emotional State: ${emotionalState}
${spotify ? `Spotify username: ${spotify}` : ""}

Respond ONLY with a valid JSON object, no extra text, no markdown backticks. Use exactly this structure:

{
  "auraType": "The [Adjective] Angel",
  "auraNumber": a number between 1 and 8 that best represents this person's energy,
  "color": "a soft pastel hex color code that matches the aura's energy",
  "textColor": "either #ffffff or a dark hex color that is readable on top of the color above",
  "reading": "3-4 sentences describing this person's aura energy. Poetic, mystical, second person (you). Reference their zodiac and emotional state subtly.",
  "prophecy": "one short mysterious sentence about something coming for this person",
  "frequency": a number between 111 and 963,
  "frequencyLabel": "a two or three word poetic label for the frequency"
}
`;
}
