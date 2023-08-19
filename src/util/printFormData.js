function PrintFormData(formData) {
  try {
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.debug(`[FILE] = ${key}: "${value.name}"`);
      } else {
        console.debug(`[FIELD] = ${key}: ${value}`);
      }
    }
  } catch (e) {
    console.debug(`FormData: ${formData}`);
  }
}
export default PrintFormData;
