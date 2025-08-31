import logo from '../../assets/puzzletix.svg'
import '../../App.css'
import { Container } from '@mui/material'

export default function Root() {

  return (
    <>
      <Container sx={{
        margin: 0,
        padding: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
        <img src={logo} className="logo" />
      </Container>
    </>
  )
}
