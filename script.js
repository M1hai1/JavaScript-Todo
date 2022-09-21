let div = document.querySelector('.div')
let note = document.querySelector('.note_item')
let AddButton = document.querySelector('.AddButton')
let input = document.querySelector('.input')
const Select = document.querySelector('.select')

const sornBtn = document.querySelector('.sortBtn')
const searchBtn = document.querySelector('.searchBtn')
const search = document.querySelector('.search')

const modalDiv = document.querySelector('.modalDiv')

document.addEventListener('DOMContentLoaded', render)

let time = ''

searchBtn.addEventListener('click', () => {
    let text = search.value
    searchArr(text)
})

let notes = [
    {   title: 'Заметка 1',
        id: Math.random().toFixed(4),
        done: false,
        marked: false
    },
    {   title: 'Заметка 2',
        id: Math.random().toFixed(4),
        done: false,
        marked: false
    }
]

function searchArr(text) {
    a = ''
    notes.find(note => {
        if (note.title == text) {
        console.log(note.title);
        a += `
        <div class="note_item">
            <li class="note_li">${(note.title || 'Пустая заметка')}</li>
            <button class='btn btn-danger' data-id=${note.id}>Удалить</button>
            <input data-id=${note.id} type='checkbox' ${!note.marked || 'checked'}></input>
        </div>
        <hr>
        `
        }
        else
        a = `<b>Ничего не найдено</b> <hr>`
    })
    search.value = ''
    console.log(notes);
    div.innerHTML = a
}


// Сортировка массива 


function sortArr(a, b) {
    if (a.title > b.title) return 1;
    if (a.title == b.title) return 0;
    if (a.title < b.title) return -1
}


sornBtn.addEventListener('click', () => { console.log(notes.sort(sortArr)), render()})

Select.addEventListener('change', (e) => {
    console.log(e.target.value);
    if (e.target.value == 'all') {
        render()
        console.log('Показать все');
    }
    else {
        console.log('Показать важные');
        renderMarked()
    }
})

function renderMarked() {
    let a = ' '
    notes.map(note => {

        if (note.marked) {
            console.log(note.title);
            if (note.done) {
                return
            }
            if (!note.marked) {
                return
            }
            
            a +=
            `
            <div class="note_item">
                <li class="note_li">${(note.title || 'Пустая заметка')}</li>
                <button class='btn btn-danger' data-id=${note.id}>Удалить</button>
                <input data-id=${note.id} type='checkbox' ${!note.marked || 'checked'}></input>
            </div>
            <hr>
            `
        }
        div.innerHTML = a

    })

}

function removeNote(id, e) {
    console.log(e);
    if (e == 'DIV') console.log('rrrg');
    notes.map((note) => {
        if (note.id == id) note.done = true
    })

    let a = 0;
    notes.forEach(note => {
        if (!note.done) a++
    })
    console.log(a);
    if (!a) {
        notes.length = 0
        renderMarked()
        render()
    }
    console.log(notes);
    if (Select.value == 'important') {
        renderMarked()
    }
    else {
        render()    
    }

   
}

function markedNote(id) {
    notes.forEach(note => {
        if (note.id == id) { !note.marked ? note.marked = true : note.marked = false }
    })
    console.log(notes);
}



function render() {
    let a = ` `

    notes.map((note, index) => {
        if (note.done) {
                return
        }
        else {
            a +=
            `
            <div class="note_item">
                <li class="note_li">${(note.title || 'Пустая заметка')}</li>
                <button class='btn btn-danger' data-id=${note.id}>Удалить</button>
                <input data-id=${note.id} type='checkbox' ${!note.marked || 'checked'}></input>
            </div>
            <hr>
            `
        }
    })
    if (!notes.length) a = `<b>Заметок нет`
    div.innerHTML = a
}

function mark(id) {
    notes.forEach(note => {
        if (note.id == id) {
            console.log(note.title);
            if (note.marked) {
                note.marked = false
            }
            else {
                note.marked = true
            }
        }
        
    })
}

// Добавить заметку

function addNote(text) {
    if (Select.value == 'important') {
        notes.push({
            title: text,
            id: Math.random().toFixed(4),
            done: false,
            marked: true
        })
        renderMarked(), input.value = ''
        return
    }
        else

    notes.push({
        title: text,
        id: Math.random().toFixed(4),
        done: false,
        marked: false
    })
    render(), input.value = ''
}

AddButton.addEventListener('click', () => {
    let text = input.value
    addNote(text)
    // if (Select.value == 'important') {
    //     notes.push({
    //         title: text,
    //         id: Math.random().toFixed(4),
    //         done: false,
    //         marked: true
    //     })
    //     renderMarked(), input.value = ''
    //     return
    // }
    //     else

    // notes.push({
    //     title: text,
    //     id: Math.random().toFixed(4),
    //     done: false,
    //     marked: false
    // })
    // render(), input.value = ''
})


div.onclick = function(event) {
    let li = event.target.tagName = 'LI'
    console.log(li)
    event.target.style.backgroundColor = 'yellow'
}
div.addEventListener('click', (e) => {
    console.log(this.tagName)
    if (e.target.tagName !== 'BUTTON') {
        return
    }

    else {
        let id = e.target.dataset.id
        removeNote(id, e.target)
        }
    
})


div.addEventListener('click', (e) => {
    if (e.target.tagName !== 'INPUT') {
        return
    }

    else {
        let id = e.target.dataset.id
        markedNote(id)
        }
    
})



