import React from "react";
import Item from "./product_list_item";

export default class extends React.Component {
  render() {
    let items = this.props.items.map(item => (
        <Item item={item} key={item.id}/>
    ))

    return(
      <div>
        {items}
      </div>
    )
  }
};
