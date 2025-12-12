/*export async function POST (req) {
  try {
    const res = await fetch({
      method: 'GET',
      url: `${process.env.QDRANT_ENDPOINT_URL}/collections/therooseveltdoctor`
    })
    const data = await res.json()
    console.log(JSON.stringify(data, null, 2))
    return NextResponse.json({ success: 'Success' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error.message)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
*/