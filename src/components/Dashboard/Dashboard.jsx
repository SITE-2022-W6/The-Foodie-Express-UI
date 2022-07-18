import * as React from 'react';
import './Dashboard.css';

export default function Dashboard(props) {
  props.setHideNavbar(false);
  props.setFooter(true);
  return (
    <div className="Dashboard">
      <h1 style={{textAlign: 'center', fontSize: '6em'}}>Hi Stranger, looks like you're hungry. Here at The Foodie Express you can order the food at any time and any where you want to eat. So right now we're in the process of building this app and we'll be finish it by August 11.</h1>
    </div>
  )
}