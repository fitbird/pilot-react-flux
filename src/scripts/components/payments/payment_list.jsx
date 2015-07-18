import React from "react";
import PaymentActions from "../../actions/payment_actions";
import PaymentStore from "../../stores/payment_store";
import Item from "./payment_list_item";

export default class PaymentList extends React.Component {
  constructor() {
    super()
    this.state = {payments: []}
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    PaymentActions.list()
  }

  componentDidMount() {
    PaymentStore.addChangeListener(this.onChange)
  }

  componentWillUnmount() {
    PaymentStore.removeChangeListener(this.onChange)
  }

  onChange() {
    this.setState({
      payments: this.state.payments = PaymentStore.getPayments()
    })
  }

  render() {
    let items = this.state.payments.map(item => (
      <Item item={item} key={item.id}/>
    ))

    return(
      <div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <div>
              ORDER DATE
              <div className="divider"></div>
              PRICE
              <div className="divider"></div>
              ORDER ID
            </div>
            {items}
          </div>
        </div>
      </div>
    )
  }
}
