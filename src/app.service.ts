import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    // Function that returns true if op1 has more priority than op2
    hasPriority(op1, op2)
    {
        if (op2 == '(' || op2 == ')')
        {
            return false;
        }
        if ((op1 == '*' || op1 == '/') &&
               (op2 == '+' || op2 == '-'))
        {
            return false;
        }
        else
        {
            return true;
        }
    }
  
    // Function that applies op on b and a
    applyOp(op, b, a)
    {
        switch (op)
        {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0)
            {
                document.write("Cannot divide by zero");
            }
            return Math.floor(a/b);
        }
        return 0;
  }


  calculate(expression){

    expression = expression.trim().replace(' ', '+')

    let tokens = expression.split('');
  
    // Stack for numbers: 'values'
    let values = [];
  
    // Stack for Operators: 'operations'
    let operations = [];
  
    for (let i = 0; i < tokens.length; i++)
    {
      // Current token is a whitespace, skip it
      if (tokens[i] == ' ')
      {
        continue;
      }
  

      // If current token is a number, push it to values
      if (tokens[i] >= '0' && tokens[i] <= '9')
      {
          let multidigit = "";
           
          // Multiple digit numbers handling
          while (i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9')
          {
              multidigit = multidigit + tokens[i++];
          }
          values.push(parseInt(multidigit, 10));
          
          // Return i with one since we skipped a character
          i--;
      }

      // If current token is a opening bracket, push it to operations
      else if (tokens[i] == '(')
      {
        operations.push(tokens[i]);
      }

      // If current token is a closing bracket, solve opening bracket
      else if (tokens[i] == ')')
      {
        while (operations[operations.length - 1] != '(')
        {
          values.push(this.applyOp(operations.pop(), values.pop(), values.pop()));
        }
        operations.pop();
      }

      // If current token is an operator
      else if (tokens[i] == '+' || tokens[i] == '-' || tokens[i] == '*' || tokens[i] == '/')
      {
            
        // If last operator is more prior than this one then finish applying it on values
        while (operations.length > 0 && this.hasPriority(tokens[i], operations[operations.length - 1]))
        {
          values.push(this.applyOp(operations.pop(), values.pop(), values.pop()));
        }

        // Push current token to opreations
        operations.push(tokens[i]);
      }
    }

    // Expression parsed, compute final result
    while (operations.length > 0)
    {
        values.push(this.applyOp(operations.pop(), values.pop(), values.pop()));
    }

    console.log(values)
    // Last value of values is the result of this expressiob
    return values.pop();
  }

}
