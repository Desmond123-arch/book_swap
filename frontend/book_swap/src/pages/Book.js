import hobbit from '../images/hobbit.jpg';

let book = [{
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "condition": "Good",
    "description": "A novel about the dangers of totalitarianism.",
    "image": hobbit,
    "posted_by": {
        "id": 1,
        "username": "john_doe",
        "email": "john@example.com"
    },
    "created_at": "2024-06-14T18:30:00Z"
}]

export default function BookDetail() {
    return (
        <div className=" w-full md:w-[80%] mx-auto px-4 py-8 border">
            <div className="mx-auto w-[85%] md:w-[70%] mb-4">
                <img src={book[0].image} alt="book" className="w-full h-auto max-h-[30rem] object-fill object-center mx-auto rounded-lg"></img>
            </div>
            <div className="mx-auto w-[85%] md:w-[70%] mb-4">
            <h3 class="text-[#181311] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Title</h3>
            <p class="text-[#181311] text-base font-normal leading-normal pb-3 pt-1 px-4">
                {book[0].title}
            </p>
            </div>
            <div className="mx-auto w-[85%] md:w-[70%] mb-4">
            <h3 class="text-[#181311] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Author</h3>
            <p class="text-[#181311] text-base font-normal leading-normal pb-3 pt-1 px-4">
                {book[0].author}
            </p>
            </div>
            <div className="mx-auto w-[85%] md:w-[70%] mb-4">
            <h3 class="text-[#181311] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Description</h3>
            <p class="text-[#181311] text-base font-normal leading-normal pb-3 pt-1 px-4">
                {book[0].description}
            </p>
            </div>
            <div className="mx-auto w-[85%] md:w-[70%] mb-4">
            <h3 class="text-[#181311] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Condition</h3>
            <p class="text-[#181311] text-base font-normal leading-normal pb-3 pt-1 px-4">
                {book[0].condition}
            </p>
            </div>
            
        </div>
    );
}
