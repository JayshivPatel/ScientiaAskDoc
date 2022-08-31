import './Bubbles.css'

const Bubbles = (props) => {
  const payload = props.payload
  const options = []
  var count = 1
  payload.forEach((elem) => {
    options.push([{ text: elem.keyword, handler: () => {}, key: count }, elem.link])
    count++
  })

  const optionsMarkup = options.map((array) => (
    <a key={array[0].key} href={array[1]} target="_blank">
      <button className="bubbles" onClick={array[0].handler}>
        {array[0].text}
      </button>
    </a>
  ))

  return <div className="bubbles-container">{optionsMarkup}</div>
}

export default Bubbles
