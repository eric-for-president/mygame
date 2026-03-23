import { Language } from './interpreter';

export interface CodeExample {
  name: string;
  language: Language;
  code: string;
  description: string;
}

export const examples: CodeExample[] = [
  // ═══════════════════════════════════
  // PYTHON EXAMPLES
  // ═══════════════════════════════════
  {
    name: 'Variables & Types',
    language: 'python',
    description: 'Basic variable assignments and types',
    code: `name = "Alice"
age = 25
height = 5.6
is_student = True

print(name)
print(age)
print(height)
print(is_student)`,
  },
  {
    name: 'If-Elif-Else',
    language: 'python',
    description: 'Multi-branch conditional logic',
    code: `score = 75

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(grade)`,
  },
  {
    name: 'Nested Conditions',
    language: 'python',
    description: 'Conditions inside conditions',
    code: `x = 15

if x > 0:
    if x > 10:
        print("Greater than 10")
    else:
        print("Between 1 and 10")
else:
    print("Non-positive")

print("Done")`,
  },
  {
    name: 'While Loop',
    language: 'python',
    description: 'Counting with while loop',
    code: `count = 1
total = 0

while count <= 5:
    total += count
    print(total)
    count += 1

print(total)`,
  },
  {
    name: 'For Loop & Range',
    language: 'python',
    description: 'Iterating with for loop',
    code: `for i in range(1, 6):
    print(i * i)

total = 0
for i in range(1, 11):
    total += i

print(total)`,
  },
  {
    name: 'Nested Loops',
    language: 'python',
    description: 'Multiplication table pattern',
    code: `for i in range(1, 4):
    for j in range(1, 4):
        result = i * j
        print(result)
    print("---")`,
  },
  {
    name: 'List Operations',
    language: 'python',
    description: 'Creating and modifying lists',
    code: `fruits = ["apple", "banana", "cherry"]
print(fruits)

fruits.append("date")
print(fruits)
print(len(fruits))

first = fruits[0]
last = fruits[3]
print(first)
print(last)`,
  },
  {
    name: 'List with Loops',
    language: 'python',
    description: 'Processing list elements',
    code: `numbers = [4, 2, 7, 1, 9, 3]
n = len(numbers)

total = 0
for i in range(n):
    total += numbers[i]
    print(numbers[i])

average = total / n
print(average)`,
  },
  {
    name: 'Functions',
    language: 'python',
    description: 'Defining and calling functions',
    code: `def greet(name):
    print(name)

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

greet("Alice")
result = add(3, 5)
print(result)
product = multiply(4, 6)
print(product)`,
  },
  {
    name: 'Factorial (Recursion)',
    language: 'python',
    description: 'Recursive function call',
    code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

result = factorial(5)
print(result)`,
  },
  {
    name: 'Fibonacci',
    language: 'python',
    description: 'Fibonacci sequence with recursion',
    code: `def fib(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)

for i in range(8):
    print(fib(i))`,
  },
  {
    name: 'Bubble Sort',
    language: 'python',
    description: 'Sorting algorithm visualization',
    code: `arr = [5, 3, 8, 1, 2]
n = len(arr)

for i in range(n):
    for j in range(n - 1):
        if arr[j] > arr[j + 1]:
            temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp

print(arr)`,
  },
  {
    name: 'Linear Search',
    language: 'python',
    description: 'Searching in a list',
    code: `def search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

numbers = [10, 25, 30, 45, 60]
pos = search(numbers, 30)
print(pos)

pos2 = search(numbers, 99)
print(pos2)`,
  },
  {
    name: 'Sum & Average',
    language: 'python',
    description: 'Computing stats from a list',
    code: `def compute_sum(arr):
    total = 0
    for i in range(len(arr)):
        total += arr[i]
    return total

data = [12, 45, 67, 23, 89]
s = compute_sum(data)
avg = s / len(data)
print(s)
print(avg)`,
  },
  {
    name: 'Power Function',
    language: 'python',
    description: 'Recursive exponentiation',
    code: `def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)

result = power(2, 8)
print(result)

result2 = power(3, 4)
print(result2)`,
  },
  {
    name: 'GCD (Euclid)',
    language: 'python',
    description: 'Greatest Common Divisor',
    code: `def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)

result = gcd(48, 18)
print(result)

result2 = gcd(100, 75)
print(result2)`,
  },
    {
        name: 'Even or Odd',
        language: 'python',
        description: 'Check parity using modulo',
        code: `n = 42

if n % 2 == 0:
        print("Even")
else:
        print("Odd")`,
    },
    {
        name: 'Range with Step',
        language: 'python',
        description: 'Iterate using custom step values',
        code: `for i in range(2, 12, 2):
        print(i)

for j in range(10, 0, -2):
        print(j)`,
    },
    {
        name: 'Running Product',
        language: 'python',
        description: 'Accumulate multiplication in a loop',
        code: `product = 1

for i in range(1, 6):
        product = product * i
        print(product)

print(product)`,
    },
    {
        name: 'List Reverse',
        language: 'python',
        description: 'Reverse list content',
        code: `nums = [1, 2, 3, 4, 5]
rev = reversed(nums)
print(rev)

for i in range(len(rev)):
        print(rev[i])`,
    },
    {
        name: 'Sorted Values',
        language: 'python',
        description: 'Sort numbers using built-in sorted',
        code: `data = [9, 1, 7, 3, 2]
ordered = sorted(data)
print(ordered)

print(ordered[0])
print(ordered[len(ordered) - 1])`,
    },
    {
        name: 'Min Max Finder',
        language: 'python',
        description: 'Find smallest and largest value',
        code: `values = [18, 4, 29, 11, 7]
smallest = min(values)
largest = max(values)

print(smallest)
print(largest)`,
    },
    {
        name: 'Absolute Difference',
        language: 'python',
        description: 'Use abs() to measure distance',
        code: `a = 13
b = 28
diff = abs(a - b)

print(diff)`,
    },
    {
        name: 'String Number Conversion',
        language: 'python',
        description: 'Convert between strings and numbers',
        code: `raw = "42"
n = int(raw)
f = float(raw)
s = str(n + 8)

print(n)
print(f)
print(s)`,
    },
    {
        name: 'Sum of Squares',
        language: 'python',
        description: 'Function that computes squared sum',
        code: `def sum_squares(n):
        total = 0
        for i in range(1, n + 1):
                total += i * i
        return total

print(sum_squares(5))`,
    },
    {
        name: 'Prime Check',
        language: 'python',
        description: 'Simple prime detection with loop',
        code: `def is_prime(n):
        if n < 2:
                return False
        flag = True
        for i in range(2, n):
                if n % i == 0:
                        flag = False
        return flag

print(is_prime(17))
print(is_prime(18))`,
    },
    {
        name: 'Recursive Sum',
        language: 'python',
        description: 'Recursively sum first n numbers',
        code: `def total(n):
        if n <= 1:
                return n
        return n + total(n - 1)

print(total(6))`,
    },
    {
        name: 'Two Function Composition',
        language: 'python',
        description: 'Call functions inside functions',
        code: `def double(x):
        return x * 2

def plus_three(x):
        return x + 3

value = plus_three(double(5))
print(value)`,
    },
    {
        name: 'Nested Loop Coordinates',
        language: 'python',
        description: 'Print grid coordinates',
        code: `for r in range(1, 4):
        for c in range(1, 4):
                print(r)
                print(c)
        print("row done")`,
    },
    {
        name: 'Average with Function',
        language: 'python',
        description: 'Compute average using helper function',
        code: `def average(arr):
        total = sum(arr)
        return total / len(arr)

vals = [10, 20, 30, 40]
print(average(vals))`,
    },
    {
        name: 'Class Counter',
        language: 'python',
        description: 'OOP: class with state and methods',
        code: `class Counter:
        def __init__(self, start):
                self.value = start

        def inc(self):
                self.value = self.value + 1

        def show(self):
                print(self.value)

c = Counter(3)
c.inc()
c.show()`,
    },
    {
        name: 'Class Rectangle Area',
        language: 'python',
        description: 'OOP: return value from class method',
        code: `class Rectangle:
        def __init__(self, w, h):
                self.w = w
                self.h = h

        def area(self):
                return self.w * self.h

r = Rectangle(4, 6)
a = r.area()
print(a)`,
    },
    {
        name: 'Class Bank Account',
        language: 'python',
        description: 'OOP: update object fields',
        code: `class Account:
        def __init__(self, amount):
                self.balance = amount

        def deposit(self, value):
                self.balance = self.balance + value

        def withdraw(self, value):
                self.balance = self.balance - value

acc = Account(100)
acc.deposit(40)
acc.withdraw(15)
print(acc.balance)`,
    },
    {
        name: 'Class Student Grade',
        language: 'python',
        description: 'OOP: methods with condition logic',
        code: `class Student:
        def __init__(self, marks):
                self.marks = marks

        def grade(self):
                if self.marks >= 80:
                        return "A"
                if self.marks >= 60:
                        return "B"
                return "C"

s = Student(72)
print(s.grade())`,
    },
    {
        name: 'Class Distance',
        language: 'python',
        description: 'OOP: reusable computation method',
        code: `class Distance:
        def __init__(self, x1, x2):
                self.x1 = x1
                self.x2 = x2

        def diff(self):
                return abs(self.x1 - self.x2)

d = Distance(25, 7)
print(d.diff())`,
    },
    {
        name: 'Class Loop Interaction',
        language: 'python',
        description: 'OOP used inside loops',
        code: `class Tracker:
        def __init__(self):
                self.count = 0

        def add(self, n):
                self.count = self.count + n

t = Tracker()
for i in range(1, 5):
        t.add(i)
print(t.count)`,
    },

  // ═══════════════════════════════════
  // C EXAMPLES
  // ═══════════════════════════════════
  {
    name: 'Basic Variables',
    language: 'c',
    description: 'Variable declarations and arithmetic',
    code: `#include <stdio.h>

int main() {
    int a = 10;
    int b = 20;
    int sum = a + b;
    int diff = a - b;
    printf("Sum = %d\\n", sum);
    printf("Diff = %d\\n", diff);
    return 0;
}`,
  },
  {
    name: 'If-Else',
    language: 'c',
    description: 'Conditional branching in C',
    code: `#include <stdio.h>

int main() {
    int x = 15;
    int y = 20;
    if (x > y) {
        printf("x is greater\\n");
    } else {
        printf("y is greater\\n");
    }
    return 0;
}`,
  },
  {
    name: 'For Loop',
    language: 'c',
    description: 'Counting with for loop',
    code: `#include <stdio.h>

int main() {
    int total = 0;
    for (int i = 1; i <= 5; i++) {
        total += i;
        printf("i=%d total=%d\\n", i, total);
    }
    printf("Final = %d\\n", total);
    return 0;
}`,
  },
  {
    name: 'While Loop',
    language: 'c',
    description: 'While loop countdown',
    code: `#include <stdio.h>

int main() {
    int n = 5;
    int factorial = 1;
    int i = 1;
    while (i <= n) {
        factorial *= i;
        printf("%d\\n", factorial);
        i++;
    }
    printf("Result = %d\\n", factorial);
    return 0;
}`,
  },
  {
    name: 'Nested Loops',
    language: 'c',
    description: 'Multiplication table',
    code: `#include <stdio.h>

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            int product = i * j;
            printf("%d * %d = %d\\n", i, j, product);
        }
    }
    return 0;
}`,
  },
  {
    name: 'Arrays',
    language: 'c',
    description: 'Array declaration and traversal',
    code: `#include <stdio.h>

int main() {
    int arr[5];
    arr[0] = 10;
    arr[1] = 20;
    arr[2] = 30;
    arr[3] = 40;
    arr[4] = 50;
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
        printf("%d\\n", arr[i]);
    }
    printf("Sum = %d\\n", sum);
    return 0;
}`,
  },
  {
    name: 'Functions',
    language: 'c',
    description: 'Function definition and calls',
    code: `#include <stdio.h>

int add(int a, int b) {
    int result = a + b;
    return result;
}

int multiply(int a, int b) {
    int result = a * b;
    return result;
}

int main() {
    int x = 5;
    int y = 3;
    int sum = add(x, y);
    int prod = multiply(x, y);
    printf("Sum = %d\\n", sum);
    printf("Product = %d\\n", prod);
    return 0;
}`,
  },
  {
    name: 'Recursive Factorial',
    language: 'c',
    description: 'Recursion in C',
    code: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    int result = factorial(5);
    printf("5! = %d\\n", result);
    return 0;
}`,
  },
  {
    name: 'String Length',
    language: 'c',
    description: 'Counting characters in a string',
    code: `#include <stdio.h>

int main() {
    char word[6];
    word[0] = 72;
    word[1] = 101;
    word[2] = 108;
    word[3] = 108;
    word[4] = 111;
    int length = 5;
    printf("Length = %d\\n", length);
    return 0;
}`,
  },
  {
    name: 'Swap Values',
    language: 'c',
    description: 'Swapping two variables',
    code: `#include <stdio.h>

int main() {
    int a = 10;
    int b = 20;
    printf("Before: a=%d b=%d\\n", a, b);
    int temp = a;
    a = b;
    b = temp;
    printf("After: a=%d b=%d\\n", a, b);
    return 0;
}`,
  },
  {
    name: 'Find Maximum',
    language: 'c',
    description: 'Finding max in array',
    code: `#include <stdio.h>

int main() {
    int arr[5];
    arr[0] = 34;
    arr[1] = 12;
    arr[2] = 67;
    arr[3] = 45;
    arr[4] = 23;
    int max = arr[0];
    for (int i = 1; i < 5; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    printf("Max = %d\\n", max);
    return 0;
}`,
  },
  {
    name: 'Sum of Digits',
    language: 'c',
    description: 'Extract and sum digits of a number',
    code: `#include <stdio.h>

int main() {
    int num = 1234;
    int sum = 0;
    int n = num;
    while (n > 0) {
        int digit = n % 10;
        sum += digit;
        printf("Digit: %d\\n", digit);
        n = n / 10;
    }
    printf("Sum = %d\\n", sum);
    return 0;
}`,
  },
  {
    name: 'Even Odd Number',
    language: 'c',
    description: 'Parity check using modulo',
    code: `#include <stdio.h>

int main() {
    int n = 27;
    if (n % 2 == 0) {
        printf("Even\\n");
    } else {
        printf("Odd\\n");
    }
    return 0;
}`,
  },
  {
    name: 'Sum 1 to N',
    language: 'c',
    description: 'Summation using loop',
    code: `#include <stdio.h>

int main() {
    int n = 10;
    int total = 0;
    for (int i = 1; i <= n; i++) {
        total += i;
    }
    printf("%d\\n", total);
    return 0;
}`,
  },
  {
    name: 'Power Iterative',
    language: 'c',
    description: 'Compute power with repeated multiply',
    code: `#include <stdio.h>

int main() {
    int base = 3;
    int exp = 4;
    int ans = 1;
    for (int i = 0; i < exp; i++) {
        ans *= base;
    }
    printf("%d\\n", ans);
    return 0;
}`,
  },
  {
    name: 'Reverse Number',
    language: 'c',
    description: 'Reverse digits in integer',
    code: `#include <stdio.h>

int main() {
    int n = 12345;
    int rev = 0;
    while (n > 0) {
        rev = rev * 10 + (n % 10);
        n = n / 10;
    }
    printf("%d\\n", rev);
    return 0;
}`,
  },
  {
    name: 'Count Digits',
    language: 'c',
    description: 'Count number of digits',
    code: `#include <stdio.h>

int main() {
    int n = 98760;
    int count = 0;
    while (n > 0) {
        count++;
        n = n / 10;
    }
    printf("%d\\n", count);
    return 0;
}`,
  },
  {
    name: 'Prime Flag Check',
    language: 'c',
    description: 'Prime detection without break',
    code: `#include <stdio.h>

int main() {
    int n = 19;
    int prime = 1;
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            prime = 0;
        }
    }
    printf("%d\\n", prime);
    return 0;
}`,
  },
  {
    name: 'GCD Loop',
    language: 'c',
    description: 'Euclid algorithm with while loop',
    code: `#include <stdio.h>

int main() {
    int a = 48;
    int b = 18;
    while (b != 0) {
        int t = b;
        b = a % b;
        a = t;
    }
    printf("%d\\n", a);
    return 0;
}`,
  },
  {
    name: 'LCM from GCD',
    language: 'c',
    description: 'Use gcd result to compute lcm',
    code: `#include <stdio.h>

int gcd(int a, int b) {
    while (b != 0) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

int main() {
    int x = 12;
    int y = 18;
    int g = gcd(x, y);
    int l = (x * y) / g;
    printf("%d\\n", l);
    return 0;
}`,
  },
  {
    name: 'Temperature Convert',
    language: 'c',
    description: 'Celsius to Fahrenheit conversion',
    code: `#include <stdio.h>

int main() {
    int c = 30;
    int f = (c * 9 / 5) + 32;
    printf("%d\\n", f);
    return 0;
}`,
  },
  {
    name: 'Leap Year',
    language: 'c',
    description: 'Classic leap-year condition',
    code: `#include <stdio.h>

int main() {
    int y = 2024;
    int leap = 0;
    if (y % 400 == 0) {
        leap = 1;
    } else if (y % 100 == 0) {
        leap = 0;
    } else if (y % 4 == 0) {
        leap = 1;
    }
    printf("%d\\n", leap);
    return 0;
}`,
  },
  {
    name: 'ASCII Character',
    language: 'c',
    description: 'Print ASCII code of character',
    code: `#include <stdio.h>

int main() {
    char ch = 'A';
    int code = ch;
    printf("%d\\n", code);
    return 0;
}`,
  },
  {
    name: 'Simple Interest',
    language: 'c',
    description: 'Finance formula with ints',
    code: `#include <stdio.h>

int main() {
    int p = 1000;
    int r = 5;
    int t = 2;
    int si = (p * r * t) / 100;
    printf("%d\\n", si);
    return 0;
}`,
  },
  {
    name: 'Function Square',
    language: 'c',
    description: 'Function returning square value',
    code: `#include <stdio.h>

int square(int x) {
    return x * x;
}

int main() {
    int a = 9;
    int s = square(a);
    printf("%d\\n", s);
    return 0;
}`,
  },
  {
    name: 'Function Cube',
    language: 'c',
    description: 'Function returning cube value',
    code: `#include <stdio.h>

int cube(int x) {
    return x * x * x;
}

int main() {
    printf("%d\\n", cube(4));
    return 0;
}`,
  },
  {
    name: 'Recursive Sum',
    language: 'c',
    description: 'Recursive natural-number sum',
    code: `#include <stdio.h>

int sumN(int n) {
    if (n <= 1) return n;
    return n + sumN(n - 1);
}

int main() {
    printf("%d\\n", sumN(6));
    return 0;
}`,
  },
  {
    name: 'Recursive Power',
    language: 'c',
    description: 'Power function with recursion',
    code: `#include <stdio.h>

int power(int b, int e) {
    if (e == 0) return 1;
    return b * power(b, e - 1);
}

int main() {
    printf("%d\\n", power(2, 10));
    return 0;
}`,
  },
  {
    name: 'Multiplication by Addition',
    language: 'c',
    description: 'Multiply two numbers with loops',
    code: `#include <stdio.h>

int main() {
    int a = 7;
    int b = 4;
    int result = 0;
    for (int i = 0; i < b; i++) {
        result += a;
    }
    printf("%d\\n", result);
    return 0;
}`,
  },
  {
    name: 'Pattern Steps',
    language: 'c',
    description: 'Nested loops for pattern count',
    code: `#include <stdio.h>

int main() {
    int count = 0;
    for (int i = 1; i <= 4; i++) {
        for (int j = 1; j <= i; j++) {
            count++;
        }
    }
    printf("%d\\n", count);
    return 0;
}`,
  },
  {
    name: 'Max of Three',
    language: 'c',
    description: 'Find maximum of three integers',
    code: `#include <stdio.h>

int main() {
    int a = 21;
    int b = 45;
    int c = 33;
    int m = a;
    if (b > m) m = b;
    if (c > m) m = c;
    printf("%d\\n", m);
    return 0;
}`,
  },
  {
    name: 'Average of Three',
    language: 'c',
    description: 'Compute integer average',
    code: `#include <stdio.h>

int main() {
    int a = 10;
    int b = 20;
    int c = 30;
    int avg = (a + b + c) / 3;
    printf("%d\\n", avg);
    return 0;
}`,
  },

  // ═══════════════════════════════════
  // JAVASCRIPT EXAMPLES
  // ═══════════════════════════════════
  {
    name: 'Variables & Types',
    language: 'javascript',
    description: 'Basic variable declarations and types',
    code: `let name = "Alice"
let age = 25
let height = 5.6
let isStudent = true

console.log(name)
console.log(age)
console.log(height)
console.log(isStudent)`,
  },
  {
    name: 'If-Else If-Else',
    language: 'javascript',
    description: 'Multi-branch conditional logic',
    code: `let score = 75
let grade = ""

if (score >= 90) {
    grade = "A"
} else if (score >= 80) {
    grade = "B"
} else if (score >= 70) {
    grade = "C"
} else if (score >= 60) {
    grade = "D"
} else {
    grade = "F"
}

console.log(grade)`,
  },
  {
    name: 'Nested Conditions',
    language: 'javascript',
    description: 'Conditions inside conditions',
    code: `let x = 15

if (x > 0) {
    if (x > 10) {
        console.log("Greater than 10")
    } else {
        console.log("Between 1 and 10")
    }
} else {
    console.log("Non-positive")
}

console.log("Done")`,
  },
  {
    name: 'For Loop',
    language: 'javascript',
    description: 'Counting with a for loop',
    code: `let total = 0

for (let i = 1; i <= 5; i++) {
    total += i
    console.log(total)
}

console.log(total)`,
  },
  {
    name: 'While Loop',
    language: 'javascript',
    description: 'Counting with a while loop',
    code: `let count = 1
let total = 0

while (count <= 5) {
    total += count
    console.log(total)
    count++
}

console.log(total)`,
  },
  {
    name: 'Nested Loops',
    language: 'javascript',
    description: 'Multiplication table pattern',
    code: `for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        let result = i * j
        console.log(result)
    }
    console.log("---")
}`,
  },
  {
    name: 'Array Operations',
    language: 'javascript',
    description: 'Creating and modifying arrays',
    code: `let fruits = ["apple", "banana", "cherry"]
console.log(fruits)

fruits.push("date")
console.log(fruits)
console.log(fruits.length)

let first = fruits[0]
let last = fruits[3]
console.log(first)
console.log(last)`,
  },
  {
    name: 'Array with Loops',
    language: 'javascript',
    description: 'Processing array elements',
    code: `let numbers = [4, 2, 7, 1, 9, 3]
let n = numbers.length

let total = 0
for (let i = 0; i < n; i++) {
    total += numbers[i]
    console.log(numbers[i])
}

let average = total / n
console.log(average)`,
  },
  {
    name: 'Objects',
    language: 'javascript',
    description: 'Working with object properties',
    code: `let name = "Alice"
let age = 25
let city = "NYC"

console.log(name)
console.log(age)
console.log(city)

age = 26
console.log(age)`,
  },
  {
    name: 'Functions',
    language: 'javascript',
    description: 'Defining and calling functions',
    code: `function greet(name) {
    console.log(name)
}

function add(a, b) {
    return a + b
}

function multiply(a, b) {
    return a * b
}

greet("Alice")
let result = add(3, 5)
console.log(result)
let product = multiply(4, 6)
console.log(product)`,
  },
  {
    name: 'Factorial (Recursion)',
    language: 'javascript',
    description: 'Recursive function call',
    code: `function factorial(n) {
    if (n <= 1) {
        return 1
    }
    return n * factorial(n - 1)
}

let result = factorial(5)
console.log(result)`,
  },
  {
    name: 'Fibonacci',
    language: 'javascript',
    description: 'Fibonacci with recursion',
    code: `function fib(n) {
    if (n <= 0) {
        return 0
    }
    if (n === 1) {
        return 1
    }
    return fib(n - 1) + fib(n - 2)
}

for (let i = 0; i < 8; i++) {
    console.log(fib(i))
}`,
  },
  {
    name: 'Bubble Sort',
    language: 'javascript',
    description: 'Sorting algorithm visualization',
    code: `let arr = [5, 3, 8, 1, 2]
let n = arr.length

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            let temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
        }
    }
}

console.log(arr)`,
  },
  {
    name: 'Linear Search',
    language: 'javascript',
    description: 'Searching in an array',
    code: `function search(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i
        }
    }
    return -1
}

let numbers = [10, 25, 30, 45, 60]
let pos = search(numbers, 30)
console.log(pos)

let pos2 = search(numbers, 99)
console.log(pos2)`,
  },
  {
    name: 'Find Maximum',
    language: 'javascript',
    description: 'Finding max in an array',
    code: `let arr = [34, 12, 67, 45, 23]
let max = arr[0]

for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i]
    }
}

console.log(max)`,
  },
  {
    name: 'Sum & Average',
    language: 'javascript',
    description: 'Computing stats from an array',
    code: `function computeSum(arr) {
    let total = 0
    for (let i = 0; i < arr.length; i++) {
        total += arr[i]
    }
    return total
}

let data = [12, 45, 67, 23, 89]
let s = computeSum(data)
let avg = s / data.length
console.log(s)
console.log(avg)`,
  },
  {
    name: 'GCD (Euclid)',
    language: 'javascript',
    description: 'Greatest Common Divisor',
    code: `function gcd(a, b) {
    if (b === 0) {
        return a
    }
    return gcd(b, a % b)
}

let result = gcd(48, 18)
console.log(result)

let result2 = gcd(100, 75)
console.log(result2)`,
  },
  {
    name: 'Swap Values',
    language: 'javascript',
    description: 'Swapping two variables',
    code: `let a = 10
let b = 20
console.log(a)
console.log(b)

let temp = a
a = b
b = temp
console.log(a)
console.log(b)`,
  },
    {
        name: 'Even or Odd',
        language: 'javascript',
        description: 'Check parity with modulo',
        code: `let n = 31

if (n % 2 === 0) {
        console.log("Even")
} else {
        console.log("Odd")
}`,
    },
    {
        name: 'Range Sum',
        language: 'javascript',
        description: 'Sum values from 1 to n',
        code: `let n = 10
let total = 0

for (let i = 1; i <= n; i++) {
        total += i
}

console.log(total)`,
    },
    {
        name: 'Countdown While',
        language: 'javascript',
        description: 'Decrement in while loop',
        code: `let n = 5

while (n > 0) {
        console.log(n)
        n--
}

console.log("done")`,
    },
    {
        name: 'Array Reverse',
        language: 'javascript',
        description: 'Reverse array in place',
        code: `let arr = [1, 2, 3, 4]
arr.reverse()
console.log(arr)

for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
}`,
    },
    {
        name: 'Array Push Pop',
        language: 'javascript',
        description: 'Mutate arrays with push and pop',
        code: `let data = [10, 20]
data.push(30)
data.push(40)
console.log(data)

data.pop()
console.log(data)`,
    },
    {
        name: 'Object Literal Access',
        language: 'javascript',
        description: 'Read object fields',
        code: `let user = { name: "Alice", score: 88 }
console.log(user.name)
console.log(user.score)

user.score = user.score + 5
console.log(user.score)`,
    },
    {
        name: 'Factorial Iterative',
        language: 'javascript',
        description: 'Factorial without recursion',
        code: `let n = 5
let fact = 1

for (let i = 1; i <= n; i++) {
        fact *= i
}

console.log(fact)`,
    },
    {
        name: 'Average Function',
        language: 'javascript',
        description: 'Function to calculate average',
        code: `function average(arr) {
        let s = 0
        for (let i = 0; i < arr.length; i++) {
                s += arr[i]
        }
        return s / arr.length
}

console.log(average([5, 10, 15, 20]))`,
    },
    {
        name: 'Prime Check',
        language: 'javascript',
        description: 'Detect prime numbers',
        code: `function isPrime(n) {
        if (n < 2) return false
        let ok = true
        for (let i = 2; i < n; i++) {
                if (n % i === 0) ok = false
        }
        return ok
}

console.log(isPrime(13))
console.log(isPrime(15))`,
    },
    {
        name: 'Recursive Sum',
        language: 'javascript',
        description: 'Sum first n numbers recursively',
        code: `function sumN(n) {
        if (n <= 1) {
                return n
        }
        return n + sumN(n - 1)
}

console.log(sumN(7))`,
    },
    {
        name: 'Math Parsing',
        language: 'javascript',
        description: 'parseInt and Number usage',
        code: `let a = parseInt("24")
let b = Number("6")
let c = a / b

console.log(a)
console.log(b)
console.log(c)`,
    },
    {
        name: 'Nested Grid Counter',
        language: 'javascript',
        description: 'Nested loop cell counting',
        code: `let count = 0

for (let r = 1; r <= 3; r++) {
        for (let c = 1; c <= 4; c++) {
                count++
        }
}

console.log(count)`,
    },
    {
        name: 'Class Person',
        language: 'javascript',
        description: 'OOP: class with constructor and method',
        code: `class Person {
        constructor(name, age) {
                this.name = name
                this.age = age
        }

        describe() {
                console.log(this.name)
                console.log(this.age)
        }
}

let p = new Person("Riya", 19)
p.describe()`,
    },
    {
        name: 'Class Counter',
        language: 'javascript',
        description: 'OOP: mutable state in object',
        code: `class Counter {
        constructor(start) {
                this.value = start
        }

        inc() {
                this.value = this.value + 1
        }

        show() {
                return this.value
        }
}

let c = new Counter(10)
c.inc()
console.log(c.show())`,
    },
    {
        name: 'Class Rectangle',
        language: 'javascript',
        description: 'OOP: method returning computed value',
        code: `class Rectangle {
        constructor(w, h) {
                this.w = w
                this.h = h
        }

        area() {
                return this.w * this.h
        }
}

let r = new Rectangle(5, 8)
console.log(r.area())`,
    },
    {
        name: 'Class Wallet',
        language: 'javascript',
        description: 'OOP: deposit and spend methods',
        code: `class Wallet {
        constructor(balance) {
                this.balance = balance
        }

        add(amount) {
                this.balance = this.balance + amount
        }

        spend(amount) {
                this.balance = this.balance - amount
        }
}

let w = new Wallet(100)
w.add(25)
w.spend(40)
console.log(w.balance)`,
    },
    {
        name: 'Class GradeBook',
        language: 'javascript',
        description: 'OOP with conditional method',
        code: `class GradeBook {
        constructor(score) {
                this.score = score
        }

        grade() {
                if (this.score >= 90) return "A"
                if (this.score >= 75) return "B"
                return "C"
        }
}

let g = new GradeBook(82)
console.log(g.grade())`,
    },
    {
        name: 'Class Distance',
        language: 'javascript',
        description: 'OOP using Math-like logic',
        code: `class Distance {
        constructor(a, b) {
                this.a = a
                this.b = b
        }

        diff() {
                if (this.a > this.b) {
                        return this.a - this.b
                }
                return this.b - this.a
        }
}

let d = new Distance(9, 25)
console.log(d.diff())`,
    },
    {
        name: 'Class Tracker with Loop',
        language: 'javascript',
        description: 'OOP object updated inside loop',
        code: `class Tracker {
        constructor() {
                this.total = 0
        }

        add(v) {
                this.total = this.total + v
        }
}

let t = new Tracker()
for (let i = 1; i <= 4; i++) {
        t.add(i)
}
console.log(t.total)`,
    },
    {
        name: 'Class Method Chain Style',
        language: 'javascript',
        description: 'Sequential method calls on object',
        code: `class Box {
        constructor(value) {
                this.value = value
        }

        double() {
                this.value = this.value * 2
        }

        minusOne() {
                this.value = this.value - 1
        }
}

let b = new Box(3)
b.double()
b.minusOne()
console.log(b.value)`,
    },
];
