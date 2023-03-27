import React from "react"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

class Layout extends React.Component {
  render(){
    return (
      <div className="bg-gradient-to-b from-gray-900 to-gray-600" data-testid="Layout-1">
        <Navbar />
            <main>{this.props.children}</main>
        <Footer />
      </div>
    )
  }
}
export default Layout;