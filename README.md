[![Codacy Badge](https://app.codacy.com/project/badge/Grade/66a733d68ddf4ab982e88c1687ecf445)](https://www.codacy.com/gh/kusakabe-t/xmind2md/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=kusakabe-t/xmind2md&amp;utm_campaign=Badge_Grade)

# XMind2Markdown
This Tools supports XMind8 (https://www.xmind.net/xmind8-pro/).

Not Supports XMind 2020 later.

## Install
```shell
$ git clone <this repository>
$ yarn
$ npm link
```

## Usage
```shell
$ cd <XMind file location>
$ xmind2md
➜ xmind2md
? Which Xmind File Convert Markdown? (Use arrow keys)
❯ filename1.xmind 
  filename2.xmind 
? Where is Convert File Destination? (./tmp/output.md)
```

### output
generate tmp/output.md file

```markdown
# Sheet1
## This is Central Topic
- This is Sub Topic
    - test1
- This is Sub Topic2
    - test2
    - test3
- This is Sub Topic3
    - test4
        - test5
- This is Sub Topic4
    - test6
        - test7
            - test8
    - test9
    - test10
# Sheet2
## This is Central Topic2
- This is Sub Topic2
    - test1
- This is Sub Topic2
    - test2
    - test3
```

## Caution
I dropped down the XMind library version to use methods of reading XMind files.

https://github.com/xmindltd/xmind-sdk-js/issues/22

## Ref
This Tool is inspired by xmind-markdown-translator.

https://github.com/zhangjingcn/xmind-markdown-translator
