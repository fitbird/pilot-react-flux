// Add callback from server to return when no errors
import React from "react";
import Button from "../button";
import InputField from "../input_field";
import InputFile from "../input_file";

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this._getCurrency = this._getCurrency.bind(this)
    this._handleCancel = this._handleCancel.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._isCurrency = this._isCurrency.bind(this)
  }

  _getCurrency() {
    let currencies = document.getElementsByName("currency")
    for (let k in currencies)
      if (currencies[k].checked === true) return currencies[k].value
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleSubmit() {
    let currency = this._getCurrency()
    let description = this.refs.description.state.fieldValue
    let image = this.refs.image.state.file
    let name = this.refs.name.state.fieldValue
    let price = this.refs.price.state.fieldValue

    if (currency && description && name && price) {
      this.props.onSubmit({
        currency: currency,
        description: description,
        image: image,
        name: name,
        price: price
      })
    }
  }

  _isCurrency(value) {
    if (value === this.props.currency) { return true } else { return false }
  }

  render() {
    return(
      <div>
        <form>
          <div>
            <InputField
              fieldName="name"
              fieldPattern="[a-zA-Z0-9]{1,}[.:-\s]{0,}?"
              fieldError="Must be letter, number, .,: or -"
              fieldType="text"
              fieldValue={this.props.name}
              ref="name">
              Name
            </InputField>
          </div>
          <div>
            <InputField
              fieldName="description"
              fieldType="text"
              fieldValue={this.props.description}
              ref="description">
              Description
            </InputField>
          </div>
          <div>
            <InputField
              fieldName="price"
              fieldPattern="[0-9]{1,}((\.|\,)[0-9]{2,2})?"
              fieldType="text"
              fieldValue={this.props.price}
              ref="price">
              Price
            </InputField>
          </div>
          <div>
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="currency-dkk">
              <input className="mdl-radio__button" id="currency-dkk" type="radio" value="DKK" name="currency" defaultChecked={this._isCurrency("DKK")}/>
              <span className="mdl-radio__label">DKK</span>
            </label>
            <div className="divider"></div>
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="currency-eur">
              <input className="mdl-radio__button" id="currency-eur" type="radio" value="EUR" name="currency" defaultChecked={this._isCurrency("EUR")}/>
              <span className="mdl-radio__label">EUR</span>
            </label>
            <div className="divider"></div>
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="currency-usd">
              <input className="mdl-radio__button" id="currency-usd" type="radio" value="USD" name="currency" defaultChecked={this._isCurrency("USD")}/>
              <span className="mdl-radio__label">USD</span>
            </label>
          </div>
          <div>
            <img src={this.props.image} alt=""/>
          </div>
          <InputFile
            ref="image"/>
          <div>
            <Button name="Cancel" onClick={this._handleCancel}/>
            <div className="divider"></div>
            <Button name="Save" onClick={this._handleSubmit}/>
          </div>
        </form>
      </div>
    )
  }
}

ProductForm.propTypes = {
  currency: React.PropTypes.string,
  description: React.PropTypes.string,
  image: React.PropTypes.string,
  name: React.PropTypes.string,
  price: React.PropTypes.string
}

ProductForm.defaultProps = {
  currency: "DKK",
  description: "",
  image: "",
  name: "",
  price: ""
}