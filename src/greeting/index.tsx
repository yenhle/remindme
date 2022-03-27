import * as React from 'react';
import './greeting.css';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function nth(o: any) {
  const so: string = String(o) || '0';
  const oo = so.search(/1?\d\b/) - 1; //how to fix in TS?
  return o + (['st', 'nd', 'rd'][oo] || 'th');
}

function getTimeBasedGreeting(d: Date) {
  const hr = d.getHours();
  return hr >= 18 && hr <= 4
    ? 'Good Evening'
    : hr > 4 && hr < 12
      ? 'Good Morning'
      : 'Good Afternoon';
}

function formatDate(d: Date) {
  const month = d.getMonth();
  const day = d.getDay();
  let dat = d.getDate();
  let hr = d.getHours();
  const ampm = hr >= 12 ? 'pm' : 'am';
  hr = hr > 12 ? hr - 12 : hr;
  let min = d.getMinutes();
  let smin: String = min < 10 ? `0${min}` : `${min}`;
  let sdat = nth(dat);
  return `${days[day]}, ${months[month]} ${sdat}, ${hr}:${smin}${ampm}`;
}

interface IGreetingProps {
  showTime: boolean;
  name?: string;
  greeting?: string;
  color?: string;
  bgColor?: string;
}

const Greeting = (props: IGreetingProps) => {
  const d = new Date();
  const greeting = props.greeting || getTimeBasedGreeting(d);
  const message = props.name
    ? greeting + ', ' + props.name + '!'
    : greeting + '!';
  const time = formatDate(d);
  const greetingObj = {
    backgroundColor: props.bgColor || 'transparent',
    color: props.color || '#fff'
  };
  return (
    <div data-greeting style={greetingObj}>
      {props.showTime ? <h5 data-greeting-time>{time}</h5> : null}
      <h1 data-greeting-body>{message}</h1>
    </div>
  );
};

export default Greeting;
