import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateFortune(
  name: string, 
  birthDate: string, 
  birthTime: string, 
  gender: string, 
  calendarType: string
) {
  const currentMonth = new Date().toLocaleString("ko-KR", { month: "long" });
  const currentDate = new Date().toLocaleDateString("ko-KR");

  const prompt = `
당신은 신비롭고 통찰력 있는 사주 명리학자입니다. 
사용자의 정보를 바탕으로 이번 달(${currentMonth})의 운세를 상세하고 따뜻하게 풀이해주세요.

사용자 정보:
- 이름: ${name}
- 성별: ${gender}
- 생년월일: ${birthDate} (${calendarType})
- 태어난 시간: ${birthTime}
- 분석 기준일: ${currentDate}

요구사항:
1. 답변은 한국어로 작성하세요.
2. 마크다운 형식을 사용하여 가독성 있게 작성하세요 (## 제목, **강조**, 리스트 등 활용).
3. 다음 섹션을 포함하세요:
   - **총평**: 이번 달의 전반적인 분위기와 흐름
   - **애정운**: 관계와 사랑에 대한 조언
   - **금전 및 업무운**: 재물과 커리어의 흐름
   - **건강 및 생활**: 유의해야 할 건강 습관이나 생활 팁
   - **행운의 요소**: 이번 달의 행운의 색상, 숫자, 장소 등
4. 신비롭지만 실질적인 위로와 용기를 주는 어조로 작성하세요.
5. "운세는 참고용일 뿐, 삶의 주인공은 자신입니다"라는 취지의 부드러운 맺음말을 포함하세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.text;
  } catch (error) {
    console.error("Error generating fortune:", error);
    throw new Error("운세를 불러오는 중에 별의 기운이 엇갈렸습니다. 다시 시도해주세요.");
  }
}
