const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const total = parts.reduce((sum, p) => sum+p.exercises, 0)
  return(
    <>
    <ul>
      {parts.map((part)=><li key={part.id}><Part part={part}></Part></li>)}
    </ul>    
    <Total sum = {total}></Total>
  </>
  )
  
}

const Course = ({course}) =>
  <>
    <Header course= {course.name}></Header>
    <Content parts= {course.parts}></Content>
  </>

export default Course