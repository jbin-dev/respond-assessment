const transcations = [
  {
    id: 3,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:34:30.000Z",
  },
  {
    id: 1,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:00.000Z",
  },
  {
    id: 6,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:05.000Z",
  },
  {
    id: 4,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:36:00.000Z",
  },
  {
    id: 2,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:50.000Z",
  },
  {
    id: 5,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:00.000Z",
  },
];

function _checkDuplicateTransaction(previous, current) {
  if (!previous.length) {
    previous.push([current]);
    return previous;
  }

  let index = 0;
  const { id, time, ...transactionValue } = current;
  const isDuplicate = previous.some((transaction, previousIndex) => {
    const {
      id: previousId,
      time: previousTime,
      ...previousTransactionValue
    } = transaction[0];

    index = previousIndex;
    return (
      JSON.stringify(previousTransactionValue) ===
      JSON.stringify(transactionValue)
    );
  });

  if (isDuplicate) {
    previous[index].push(current);
  } else {
    previous.push([current]);
  }
  return previous;
}

function _sortDuplicateTransction(a, b) {
  const aDateTime = new Date(a.time);
  const bDateTime = new Date(b.time);
  return aDateTime.getTime() - bDateTime.getTime();
}

function findDuplicateTransactions(transactions = []) {
  if (!transactions.length) {
    return [];
  }

  const groupedTransactions = transactions
    .reduce((previous, current) => {
      return _checkDuplicateTransaction(previous, current);
    }, [])
    .map((groupedTransaction) => {
      return groupedTransaction.sort((a, b) => _sortDuplicateTransction(a, b));
    });

  return groupedTransactions;
}

const result = findDuplicateTransactions(transcations);

console.log(result);
