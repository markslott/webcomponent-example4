import fetchDataHelper from './fetchDataHelper.js';
import { LitElement, css, html } from 'lit-element';

//This is the module that defines the behavior of our web component
export default class Contacts extends LitElement {

    //styles are declared in the JS module
    static get styles() {
        return css`
        .datatable {
            width:100%;
            border-collapse:collapse;
        }
        .datatable th {
            padding:0.5em;
            background : white;
        }
        .datatable td{
            padding: 0.5em;
            border: #4e95f4 1px solid;
        }
        .datatable tr{
            background : #b8d1f3;
        }
        .datatable tr:nth-child(odd) {
            background : #b8d1f3;
        }
        .datatable tr:nth-child(even) {
            background: #dae5f4;
        }
        `;
      }

    //this defines the properties for the component - similar to @api in a LWC
    static get properties() {
        return { 
          title: { type: String },
          data: { type: Array }
        };
      }

    //in the constuctor we initilize state, add our event listeners, and create the 
    //shadow DOM. Polymer deals with the shadow DOM for us.
    constructor() {
        super();
        this.title = "";
        this.data = [];
    }
      
    //very react like here - html isn't quite the first class citizen it is with JSX, but close.
    //this function renders the html template when the state changes
    render() {
        return html`
            <div>
                <span class="title">${this.title}</span>
                <button name="Refresh" class="refreshbutton" @click="${this.refresh}">Refresh</button>
                <table class="datatable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Website</th>
                            <th>Amount</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.data.map(item => html`
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.website}</td>
                            <td>${item.amount}</td>
                            <td>${item.phone}</td>
                        </tr>`)}
                    </tbody>
                </table>
            </div>`
    }
    
    //in connectedCallback we retrieve data end render it
    connectedCallback() {
        super.connectedCallback();
        this.getData();
    }

    //here we remove our event listeners... but we didn't need any
    disconnectedCallback() {
        super.disconnectedCallback();
    }


    //this is called when we need to rerender because an attribute changed
    //this is a standard function, but we really don't need to use it because
    //polymer will rerender the component for us automatically when we requestUpdate()
    attributeChangedCallback(name,oldval,newval) {
        console.log('attribute change: ', name, newval);
        super.attributeChangedCallback(name, oldval, newval);
    }

    //called by the refresh button via onclick
    refresh() {
        this.getData();
    }

    async getData() {
        const data = await fetchDataHelper({amountOfRecords : 10});
        this.setAttribute('data', JSON.stringify(data));
        console.log(data);
        this.requestUpdate();
    }
}

//This is what binds the custom element (namely <my-contacts/>) to our javascript module 
customElements.define('my-contacts', Contacts);