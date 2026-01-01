export const todoStyles = {
    container:
        "min-h-screen bg-gray-100 text-gray-900 \
         flex flex-col items-center \
         py-10 px-4 \
         dark:bg-gray-900 dark:text-gray-100 \
         transition-colors duration-500",

    card:
        "w-full max-w-md \
         bg-white dark:bg-gray-800 \
         shadow-lg rounded-2xl \
         p-6 \
         transition-all duration-500",

    title:
        "text-3xl font-bold \
         mb-6 \
         text-center \
         tracking-tight",

    searchInput:
        "w-full px-4 py-2 \
         border border-gray-300 rounded-lg shadow-sm \
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent \
         dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 \
         transition",

    newTodoInput:
        "flex-1 px-4 py-2 \
         border border-gray-300 rounded-lg shadow-sm \
         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent \
         dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 \
         transition",

    stats:
        "text-gray-700 dark:text-gray-300 \
         mb-5 text-center",

    counter:
        "inline-block font-semibold \
         text-blue-600 dark:text-blue-400 \
         transition-transform duration-300",

    feedback:
        "transition-all duration-500 ease-in-out \
         text-center \
         mt-2 mb-2 \
         delay-150",

    todoList:
        "space-y-3",

    newTodoTextarea:
        "flex-1 px-4 py-2 h-[44px] max-h-[200px] overflow-hidden resize-none \
        border border-gray-300 rounded-lg shadow-sm \
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent \
        dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-400 transition",

    todoItemContainer:
        "flex items-center justify-between bg-gray-50 dark:bg-gray-700 \
         px-4 py-2 rounded-xl shadow-sm hover:shadow-md \
         transition-all duration-200 border border-transparent \
         hover:border-gray-200 dark:hover:border-gray-600",

    todoText:
        "flex-1 min-w-0 cursor-pointer select-none text-sm sm:text-base transition",

    todoTextDone:
        "line-through text-gray-400 dark:text-gray-500",

    todoTextActive:
        "text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400",

    editContainer: "flex-1 flex flex-col w-full gap-2",

    editTextarea:
        "w-full px-3 py-1.5 rounded-lg border border-gray-300 \
         dark:border-gray-600 dark:bg-gray-800 \
         focus:outline-none focus:ring-2 focus:ring-blue-500 \
         text-sm transition resize-none overflow-hidden ",

    btnDelete:
        "bg-red-500 text-white px-3 py-1.5 text-sm rounded-lg \
         hover:bg-red-600 active:scale-95 transition-transform",

    btnEdit:
        "bg-yellow-400 text-gray-900 px-3 py-1.5 text-sm rounded-lg \
         hover:bg-yellow-500 active:scale-95 transition-transform",

    btnSave:
        "bg-blue-500 text-white px-3 py-1.5 text-sm rounded-lg \
         hover:bg-blue-600 active:scale-95 transition-transform",

    btnGroup: "flex gap-2 ml-3",

    navbar:
        "dark:bg-gray-900/80 backdrop-blur-md shadow-md sticky top-0 z-50 \
          border-b border-gray-200 dark: border-gray-700 transition-all duration-300",

    navbarInner: "max-w-4xl mx-auto flex justify-center py-4 px-6",

    navbarLink:
        "text-3xl font-extrabold text-cyan-400 hover:text-cyan-600 \
         transition-transform duration-200 transform hover:scale-105",

    categorySelect:
        "h-[44px] px-3 \
        border border-gray-300 rounded-lg shadow-sm \
        bg-white text-sm \
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent \
        dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 \
        transition",

    tag:
        "inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium \
        bg-gray-200 dark:bg-gray-700 \
        text-gray-800 dark:text-gray-100 cursor-pointer \
        hover:bg-gray-300 dark:hover:bg-gray-600 transition",

    activeTag:
        "inline-block px-2 py-0.5 rounded-lg text-sm font-medium \
     bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-100",

    categoryBadge:
        "inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium \
    bg-blue-100 dark:bg-blue-700 \
    text-blue-700 dark:text-blue-100 relative top-[1px]",

    tagsContainer:
        "flex gap-2 mt-1 flex-wrap",
    newTodoButton:
        "h-[44px] px-4",
    emptyState:
        "w-full py-8 text-center \
        text-base font-medium \
        text-gray-500 dark:text-gray-400 \
        bg-gray-100 dark:bg-gray-800 \
        rounded-xl border border-dashed \
        border-gray-300 dark:border-gray-600 \
        transition",
    priorityBadge: {
        low: "bg-gray-100 text-gray-700",
        medium: "bg-blue-100 text-blue-700",
        high: "bg-orange-100 text-orange-700",
        urgent: "bg-red-100 text-red-700 font-semibold",
    },
};