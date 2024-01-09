export const sendCodeFile = async (data: any) => fetch('/api/sendCode', {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
})