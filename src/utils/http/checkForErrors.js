export const checkForErrors = response => {
   if (!response.ok) throw new Error(response.statusText)
   return response.json()
}
