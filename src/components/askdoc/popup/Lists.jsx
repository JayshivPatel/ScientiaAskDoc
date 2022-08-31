import './Lists.css'

const topics = [
  ['Careers', 0],
  ['Chaplaincy', 1],
  ['Clubs and Societies', 2],
  ['Course Information', 3],
  ['Crime', 4],
  ['Dental Health', 5],
  ['Offers and Discounts', 6],
  ['General Health', 7],
  ['Finances', 8],
  ['Accommodation and Hall Seniors', 9],
  ['Library', 10],
  ['Mental Health', 11],
  ['Mitigation', 12],
  ['Private Housing', 13],
  ['Halls', 14],
  ['Student Information', 15],
  ['Summer Accommodation', 16],
  ['Travel', 17],
  ['Tuition Fees', 18],
]

const listOfTopics = topics.map((entry) => <li key={entry[1]}>{entry[0]}</li>)

const Lists = () => {
  return (
    <div>
      <ul>{listOfTopics}</ul>
    </div>
  )
}

export default Lists
