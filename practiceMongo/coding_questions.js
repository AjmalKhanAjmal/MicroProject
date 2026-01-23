
    function countDigits(source) {
        let count = 0
        let data = source.trim(" ")
        console.log(data);

        if (source) {
            for (let i = 0; i < source.length; i++) {
                if (!isNaN(source[i]) && source[i].trim() !== "") {
                    count++
                }

            }
        }
        return count
    }

    // console.log(countDigits("  7883as bha  "));


    function countNonDigits(source) {
        let count = 0
        if (source) {
            for (let i = 0; i < source.length; i++) {
                if (isNaN(source[i]) && source[i].trim() !== "") {
                    count++
                }
            }
        }
        return count
    }

    // console.log(countNonDigits("  7883as bha  "));


    function EvenCountAndOddCount(source) {
        let even_count = 0
        let odd_count = 0
        let input = source
        if (typeof (input) !== "string") {
            input = input.toString()
        }

        if (input) {
            for (let i = 0; i < input.length; i++) {
                let char = input[i]
                if (!isNaN(char) && char.trim() !== "") {
                    if (char % 2 == 0) {
                        even_count++
                    } else {
                        odd_count++
                    }
                }

            }
        }
        return {
            even_count,
            odd_count
        }
    }

    // console.log(EvenCountAndOddCount("83929 eref54 20"));


    function sumDigits(source) {
        let sum = 0
        if (source) {
            if (!typeof source == 'string') return source = source.toString()
            for (let i = 0; i < source.length; i++) {
                let currentIndex = source[i]

                if (!isNaN(currentIndex) && currentIndex.trim() !== "") {
                    sum = sum + Number(currentIndex)
                }
            }
        }
        return sum
    }

    // console.log(sumDigits("jsd98  2102"));




    //     0 1 1 2 3
    //A sequence of numbers where each number is the sum of the two before it:
    function fibinocciSeries(source) {
        if (source) {
            // let a = 0
            // let b = 1
            let arr = [0, 1]
            for (let i = 2; i < source; i++) {
                arr[i] = arr[i - 1] + arr[i - 2]
                // console.log(arr[0])

            }
            console.log(arr);

        }
    }


    // console.log(fibinocciSeries(10));



    function fib(n) {
        if (n <= 1) return n;
        // console.log(n);

        return fib(n - 1) + fib(n - 2);
    }

    // console.log(fib(10));  // 55



    //check prime  number

    function isPrime(num) {
        let n = Number(num)

        if (n == 2) return true
        for (let i = 2; i < num; i++) {
            if (n % i == 0) return false
        }
        return true
    }

    function primeNumberList(num) {
        let prime_numbers_list = []
        for (let i = 2; i < num; i++) {
            if (isPrime(i)) prime_numbers_list.push(i)
        }
        return prime_numbers_list
    }

    // console.log(primeNumberList(110));


    //     // Check if a number is prime
    // function isPrime(n) {
    //     n = Number(n);
    //     if (n <= 1) return false;      // 0 and 1 are not prime
    //     if (n === 2) return true;      // 2 is prime
    //     for (let i = 2; i <= Math.sqrt(n); i++) {  // check up to √n
    //         if (n % i === 0) return false;         // divisible → not prime
    //     }
    //     return true;                   // no divisors → prime
    // }

    // // Generate prime number list up to num
    // function primeNumberList(num) {
    //     num = Number(num);             // convert string to number
    //     let prime_numbers_list = [];
    //     for (let i = 2; i <= num; i++) {
    //         if (isPrime(i)) prime_numbers_list.push(i);
    //     }
    //     return prime_numbers_list;
    // }

    // console.log(primeNumberList("10")); // Output: [2, 3, 5, 7]


    function getOrderNumber() {
        // if (number.length < 2) {
        //   throw new Error('Length should be at least 2');
        // }
        const letterCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberCharset = '0123456789';
        let randomString = '';
        // Generate the first character (letter)

        const randomLetterIndex = Math.floor(Math.random() * letterCharset.length);
        randomString += letterCharset.charAt(randomLetterIndex);
        // Generate the remaining characters (numbers)
        for (let i = 1; i < 10; i++) {
            const randomNumberIndex = Math.floor(Math.random() * numberCharset.length);
            randomString += numberCharset.charAt(randomNumberIndex);
        }


        return randomString;
    }


    // console.log(getOrderNumber());



    function factorialOfNumber(num) {

        if (n < 0) {
            return "Factorial does not exist for negative numbers";
        }
        if (n === 0 || n === 1) {
            return 1;
        }
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;

    }
    // console.log(factorialOfNumber(3));


    function sumOfArray(source) {
        let sum = 0
        if (source) {
            for (let i = 0; i < source.length; i++) {
                sum += source[i]
            }
        }
        return sum;
    }

    // let source = [2,32,1]
    // console.log( sumOfArray(source));


    function largestOfThree(num1, num2, num3) {

        // option 2 

        // let largest = Math.max(a, b, c);
        let results = (num1 > num2 && num1 > num3) ? num1 : ((num2 > num3 && num2 > num1) ? num2 : num3)
        console.log(results);
        // (a > b) 
        //         ? (a > c ? a : c) 
        //         : (b > c ? b : c);

        // if (num1 && num2 && num3) {
        //     if (num1 > num2 && num1 > num3) {
        //         return num1
        //     } else if (num2 > num1 && num2 > num3) {
        //         return num2
        //     } else return num3
        // }
    }



    // console.log(largestOfThree(1222, 643, 9339));


    function findMinAndMax(source) {
        // let results = {
        //     max : Math.max(...source),
        //     min : Math.min(...source)
        // }
        let max = 0
        let min = source[0]


        for (let i = 0; i < source.length; i++) {

            if (source[i] > max) {
                max = source[i]

            }

            if (source[i] < min) {
                min = source[i]
            }
        }
        return {
            max_num: max,
            min_num: min
        }
    }

    // let source = [2,0,3, 13 ,232,5]
    // console.log(findMinAndMax(source));




    // push unique ids

    function getData(source) {
        let category = []


        let category_obj = []
        let sub_category_obj = []
        let main_category_obj = []
        if (source) {
            let temp_obj = JSON.parse(source)
            if (temp_obj.data && temp_obj.data.length > 0) {
                for (let i = 0; i < temp_obj.data.length; i++) {
                    let current_record = temp_obj.data[i]

                    if (category.indexOf(current_record.main_category_id) === -1) {

                        category.push(current_record.main_category_id)


                        main_category_obj.push({
                            "id": current_record.main_category_id
                        })
                    }
                    if (category.indexOf(current_record.category_id) === -1) {
                        category.push(current_record.category_id)

                        category_obj.push({
                            "id": current_record.category_id
                        })
                    }
                    if (category.indexOf(current_record.sub_category_id) === -1 && current_record.sub_category_id) {
                        category.push(current_record.sub_category_id)

                        sub_category_obj.push({
                            "id": current_record.sub_category_id
                        })
                    }
                }
            }
        }
        console.log("main categ : ", main_category_obj);
        console.log("category : ", category_obj);
        console.log("sub category : ", sub_category_obj);

        // console.log("category_ obj : ", category_obj);


    }


    // find dublicates in array

    function findDublicates(source) {

        // approach --1 

        // let seen = new Set();
        // let duplicates = new Set();

        // for (let item of arr) {
        //     if (seen.has(item)) {
        //         duplicates.add(item);
        //     } else {
        //         seen.add(item);
        //     }
        // }

        // return [...duplicates];



        let dublicate_data = []
        let pushed_items = []
        let after_dublicates_removed = []
        if (source) {
            for (let i = 0; i < source.length; i++) {
                let current_element = source[i]
                if (!after_dublicates_removed.includes(current_element)) {
                    after_dublicates_removed.push(current_element)
                } else {
                    dublicate_data.push(current_element)
                }
            }
        }
        return { dublicate_data, after_dublicates_removed }
    }

    // let source = [2, 3, 1, 54, 65, 22, 33, 4, 2, 3]
    // console.log(findDublicates(source));





    function countCharacters(str) {
        let freq = {};

        for (let char of str) {
            freq[char] = (freq[char] || 0) + 1
        }



        return freq;
    }

    // console.log(countCharacters("hello worrrld"));


    //Highest frequesncy in String
    function highestFrequesncyInString(str) {
        let freq = {};

        for (let char of str) {
            freq[char] = (freq[char] || 0) + 1
        }

        let max_element = Math.max(...Object.values(freq))

        let max_accured_characters = Object.keys(freq).filter((key) => freq[key] == max_element)
        console.log("max -- ", max_accured_characters);

        return freq;
    }

    // console.log(highestFrequesncyInString("hello worrrld"));


    function countWords(str) {
        let freq = {}
        if (str) {
            let words = str.split(" ")
            for (let wor of words) {
                freq[wor] = (freq[wor] || 0) + 1
            }
        }
        return freq
    }

    // console.log(countWords("hello world hskjns hello"));



    function frequencyNumbers(numbers){
        if(typeof numbers == 'number') numbers = numbers.toString()

        let num_freq  = {}

        for(single_num of numbers ){
            num_freq["num - "+  single_num] = ( num_freq[ "num - s" +single_num]  || 0) + 1
        } 

        return num_freq
    }

    console.log(frequencyNumbers(903483403));
    

    //   let source = JSON.stringify({ "start_date": "2025-11-13T08:00:00Z", "end_date": "2025-11-28T17:00:00Z" })

    //   console.log(checkEndDate(source, "US/Eastern"));
    function checkEndDate(source, timezone) {
        let is_ends_today = "0";

        let timeZoneOffsets = {
            "US/Eastern": -4,
            "US/Central": -5,
            "US/Mountain": -6,
            "US/Pacific": -7,
        };

        let offset = timeZoneOffsets[timezone] * 60 * 60 * 1000;

        if (source) {
            let temp_obj = JSON.parse(source)
            let start_on_date = temp_obj.start_date
            let ends_on_date = temp_obj.end_date

            if (start_on_date && ends_on_date) {
                let currentDate = new Date();
                let current_end_date = new Date(ends_on_date);
                let current_start_date = new Date(start_on_date)
                let currentDateUTC = new Date(currentDate.getTime() + offset);


                let start_date_after_timezone = new Date(current_start_date.getTime() + offset).toISOString()

                let end_date_after_timezone = new Date(current_end_date.getTime() + offset).toISOString()
                let currentDateString = currentDateUTC.toISOString();
                // console.log(currentDateString);

                // console.log("start" , start_date_after_timezone);
                // console.log(end_date_after_timezone);
                if (currentDateString >= start_date_after_timezone && currentDateString <= end_date_after_timezone) {
                    is_ends_today = 1
                }
            }
        }

        return is_ends_today;
    }



    function convertToUSFormat() {
        // Remove any non-numeric characters
        // var cleanNumber = number.replace(/\D/g, '');

        // Add +1 country code and format the number as (XXX) XXX-XXXX
        var formattedNumber = "83844888888".replace(/(\d{3})(\d{3})(\d{4})/, '+1 ($1) $2-$3');
        // var formattedNumber = "3848883389".replace(/^(\d{3})(\d{3})(\d{4})$/,'+1 ($1)-$2 $3')

        //    var formattedNumber = "1abc234".replace(/\d/, '');
        // var formattedNumber = "1abc234".replace(/\d/g, ''); //replacing Numbers , removing numbers 
        // var formattedNumber = "1abcC2_fds%)34".replace(/\D/g, ''); //replacing characters, special Characters
        // var formattedNumber = "1abcC2_fds%)34".replace(/\W/g, ''); ///replace Special Characters except alphabet,digit and underscore
        // var formattedNumber = "1abcC2_f--+=ds%)34".replace(/\w/g, ''); // replaces all values exept special characters
        // var formattedNumber = "1abcC2_f--+=ds%)34".replace(/\w/g, '');

        // var formattedNumber = "384888338888809552".replace(/^(\d{3})(\d{3})(\d{4,})$/,'+1 ($1)-$2 $3')



        return formattedNumber;
    }

    // console.log(convertToUSFormat())



    function practiceNumber(source) {
        if (source) {
            let data = source.replace(/\D/g, "")
            let final_results = data.replace(/^(\d{3})(\d{3})(\d{4})$/, '+1 ($1)-$2-$3')
            // return final_results
            return final_results
        }
    }

    // console.log(practiceNumber("372283449293"));


