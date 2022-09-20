import { div } from './utils'


const App = (): HTMLElement => {
    return div({ id: '1' })(
        div({ id: '2' })(
            "hi"
        ),
        div({ id: '3' })(
            "hello"
        )
    )
}

document.querySelector("#root").appendChild(App())
console.log('here!')
