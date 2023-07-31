export default function () {
  if (!process.env.JWT_PRIVATE_KEY) {
    throw new Error("FATAL ERROR: jwt Private Key is not defined.");
  }
}
