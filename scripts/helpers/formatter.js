const sortExpenses = (expenses) => {
  let sortedExpenses = new Array()

  for (let name in expenses) {
    sortedExpenses.push({name, value: expenses[name]})
  }

  return sortedExpenses.sort((a, b) => b.value - a.value)
}

const formatExpensesToSlack = (expenses) => {
  const sortedExpenses = sortExpenses(expenses)

  let text = ""
  for (let expense of sortedExpenses) {
    text += `\n${expense.name}\t${expense.value}`
  }

  let message = {
    attachments: [
      {
          pretext: "The moon is shining like a golden coin Today!",
          title: "Current developers expenses",
          text,
          color: "#7CD197"
      }
    ]
  }

  return message
}

export {
  formatExpensesToSlack
}
