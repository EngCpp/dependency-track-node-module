
sleep = async(ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

exports.sleep = sleep;
exports.showProgressBarAnimation = async(label, millieSeconds) => {
    const iterations = 10;
    console.clear();
    console.log(label + '|' + ('-'.repeat(iterations)) + '| 0%')

    for (let i = 1; i <= iterations; i++) {
      await sleep(millieSeconds/iterations);
      console.clear();
      console.log(label + '|' + ('█'.repeat(i)) + ('-'.repeat(iterations-i)) + '|' + ((100*i)/iterations) + '%');
    }
}
