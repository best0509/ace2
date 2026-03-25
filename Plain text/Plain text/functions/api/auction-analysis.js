export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const caseNumber = (body.caseNumber || "").trim();
    const itemNumber = (body.itemNumber || "").trim();

    if (!caseNumber) {
      return jsonResponse(
        {
          ok: false,
          message: "사건번호를 입력해주세요."
        },
        400
      );
    }

    // 현재는 테스트용 기본 분석 결과
    const analysisResult = {
      basicInfo: {
        caseNumber: caseNumber,
        itemNumber: itemNumber || "미입력"
      },
      analysis: {
        status: "success",
        title: "경매 분석 기본 응답",
        summary: "현재는 테스트 단계입니다.",
        details: [
          "사건번호가 정상적으로 전달되었습니다.",
          "물건번호가 함께 전달되었습니다.",
          "추후 실제 경매 데이터 수집 로직을 추가할 수 있습니다.",
          "추후 시세 분석, 권리분석, 낙찰가 예상 기능을 붙일 수 있습니다."
        ]
      }
    };

    return jsonResponse({
      ok: true,
      message: "분석 요청이 정상 처리되었습니다.",
      data: analysisResult
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        message: "서버 처리 중 오류가 발생했습니다.",
        error: String(error)
      },
      500
    );
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status: status,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store"
    }
  });
}