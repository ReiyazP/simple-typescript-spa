import { div, } from './HTMLElements'


const App = (): HTMLElement => {
    let count: number = 1;
    return div({ id: 'yo' })(
        div(
            {
                id: 'stow',
                style: { background: 'blue' },
                onclick: () => {
                    count += 1
                    document.querySelector('#stow').innerHTML = `${count}`
                }
            },
        )
            (
                `${count}`
            ),

    )
}

document.querySelector("#root").appendChild(App())
console.log('here!')
