export async function post <RequestType, ResponseType> (url: string, requestBody: RequestType): Promise<ResponseType> {
  const rawResponse = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  const response = (await rawResponse.json()) as ResponseType
  return response
}
