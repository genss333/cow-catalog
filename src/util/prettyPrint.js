function PrettyPrint(json) {
  try {
    const pretty = JSON.stringify(json, null, 2);
    return pretty;
  } catch (e) {
    return json.toString();
  }
}
export default PrettyPrint;


