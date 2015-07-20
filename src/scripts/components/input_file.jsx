import React from "react";

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      file: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault()

    let file = document.getElementById("file--selected").files[0]

    this.setState({
      file: file
    })
  }

  render() {
    return(
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input
          className="mdl-textfield__input"
          id="file--selected"
          type="file"
          ref="selectedFile"
          accept="image/jpeg, image/jpg, image/png"
          onChange={this.handleChange}/>
        <label
          htmlFor="file--selected">
        </label>
      </div>
    )
  }
}