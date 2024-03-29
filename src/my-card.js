// we import JS code into this JS code. Modular javascript is a big deal
// more modern (relatively speaking) and allows the web to feel like
// a full blown development environment
import { LitElement, html, css } from 'lit';

// export means that other JS files can reference this JS file and
// pull in this class

// class means it's a full object to work with with methods and properties
// extends means this class is built off another
// LitElement is a small helper from lit.dev which makes it easy
// to understand how to build web components. Think of it like jQuery
// as far as built juuuuust on top of vanillaJS to make it easier to build
// things. However, unlike jQuery, ALL things built on Web components are
// compatible with all things built on other web component systems!
// We will only stick with Lit for this class and look at Vanilla examples
// but compatibility across sites / libraries is unique to web components
// and not a thing in React, Vue, Angular, etc
export class MyCard extends LitElement {
  // this is not a requirement, but it's a convention I personally enjoy
  // because it helps when looking at multiple elements. I open this file
  // I glance and go "oh the HTML tag for this code is called polaris-chip"
  // see the very bottom of the file for where this is actually implemented
  static get tag() {
    return 'my-card';
  }
  // constructor establishes defaults for the class
  constructor() {
    super();
    // a variable on this object called title
    this.link = '#';
    this.fancy = false;
    this.title = "Check it out!";
  }

  // CSS styles are scoped JUST to this element. This uses a technology called
  // "Shadow DOM" which is ver controversial to some, but to new people and new
  // things, it's incredible. It automatically ensures that the things in your render()
  // method below it look exactly the same always no matter where they are loaded!
  static get styles() {
    // "css" called here is actually a function exported from Lit at the top
    // so that it scopes the CSS nicely and also applies sanitization
    return css`
    /*
      :host is a special selector meaning "the tag itself"
      Think of if we were looking at how a <strong> tag is made. It would have
      :host { font-weight: bold; display: inline; }
    */
      :host {
        /* Always make sure that your element has a default way of being displayed */
        display: block;
        border: 1px solid black;
        margin: 20px;
        padding: 20px;
      }
      :host([fancy]) {
        display: block;
        background-color: pink;
        border: 2px solid fuchsia;
        box-shadow: 10px 5px 5px red;

      img{
        width: 100px;
      }
details summary {
    text-align: left;
    font-size: 20px;
    padding: 8px 0;
  }

  details[open] summary {
    font-weight: bold;
  }
  
  details div {
    border: 2px solid black;
    text-align: left;
    padding: 8px;
    height: 70px;
    overflow: auto;
  }
}

      span {
        background-color: orange;
        color: black;
        font-size: 24px;
        padding: 8px;
        margin: 8px;
      }

      span:hover{
        background-color: grey;
        border: 1px solid black;
      }
      .card {
        width: 300px;
        max-height: 500px;
        padding: 24px;
        margin: 8px;
        background-color: orange;
        opacity: 0.8;
        border-radius: 8px;
      }
      .pic {
        width: 300px;
        height: 200px;
        border-radius: 15px;
        object-fit: cover;
      }

    `;
  }

  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  openChanged(e) {
    console.log(e);
    if (e.target.getAttribute('open') !== null) {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  /**
   * render method is specific to LitElement based code. Anything you write here
   * you can think of as what gets printed to the screen when the tag is used.
   * In this example, <polaris-chip></polaris-chip> will actually display what you
   * see below in the render method.
   * @returns an HTML template which gets sanitized and rendered
   */
  render() {
    // html much like css above applies sanitization / security and ensures
    // there is a valid HTML template that is displayed on screen. It's important
    // to keep in mind that any broken HTML tags or JS variables here can cause
    // your element to not render so color coding and syntax checking with console
    // open in your browser is critical!

    // ` is a special character that allows JS to print variables in it using
    // the ${} syntax, any variable can happen between those tags. Shown below
    // it is going to print the title of the element. The magic of Lit is that
    // when title is changed (even by inspecting the document and hacking the value)
    // it will automatically update what is displayed and do so incredibly quickly
    return html`
          <div class="card">
          <h3>${this.title}</h3>       
          <img class = "pic" src = ${this.image} />

          <div>
          <details ?open="${this.fancy}" @toggle="${this.openChanged}">
            <summary>Description</summary>
            <div>
              <slot>${this.description}</slot>
            </div>
          </details>
          </div>
        </div>
    `;
  }


  // LitElement uses the properties call to do the following:
  // - When a value changes it reacts to the change
  // - When it reacts to the change and it's listed in the render() method, it rerenders
  // - this is what users would expect, but is not the way the web usually works
  // - Lit + Web component spec + properties == HTML with data variables
  static get properties() {
    return {
      // this is a String. Array, Object, Number, Boolean are other valid values here
      title: { type: String },
      image: {type: String},
      description: {type: String },
      link: {type: String, attribute: "link"},
      text: {type: String, attribute: "text"},
      width: {type: String },
      length: {type: String },
      fancy: {type: Boolean, reflect: true},
  }

}

}
// All web components have a call to customElements.define(tag-name, className);
// this code tells the browser that when you see this new HTML tag name
// that you should run this class definition. This is the magic of standards
// because this code runs at the browser layer it means that Safari/Firefox/Chrome/Edge
// authors have all agreed on how this should work and as a result it is extremely fast
// Lit operates juuuust above the standards layer and leverages other standards
// in order to deliver optimal performance with minimal "syntactical sugar"
// aka things specific to Lit itself
globalThis.customElements.define(MyCard.tag, MyCard);