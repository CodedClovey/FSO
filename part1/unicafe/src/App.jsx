import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return(
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good,neutral,bad}) => {

  if(good>0 || neutral>0 || bad>0){
    return(
      <table>
      <tbody>
      <StatisticLine text="good " value={good} ></StatisticLine>
      <StatisticLine text="neutral " value={neutral} ></StatisticLine>
      <StatisticLine text="bad " value={bad} ></StatisticLine>
      <StatisticLine text="all " value={good+neutral+bad} ></StatisticLine>
      <StatisticLine text="average " value={(good+bad*-1)/(good+neutral+bad)} ></StatisticLine>
      <StatisticLine text="positive " value={((good)/(good+neutral+bad))*100} ></StatisticLine>
      </tbody>
      </table>
    )
  }
  else return(
    <p>No feedback given</p>
  )
}

const Box = (props) => {
  return(
    <button onClick={() => props.handleClick(props.name)}>
      {props.name}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const doClick = (arg) => {
    if(arg == "good"){
      setGood(good+1)
    }
    if(arg == "neutral"){
      setNeutral(neutral+1)
    }
    if(arg == "bad"){
      setBad(bad+1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Box name="good" handleClick= {doClick}></Box>
      <Box name="neutral" handleClick= {doClick}></Box>
      <Box name="bad" handleClick= {doClick}></Box>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>

    </div>
  )
}

export default App