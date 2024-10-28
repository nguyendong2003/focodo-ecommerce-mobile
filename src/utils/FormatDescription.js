export const formatDescription = (content) => {
    return `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
          <style>
              body {
                  font-family: Arial, sans-serif;
                  padding: 10px;
                  line-height: 1.6;
                  background-color: #fff;
              }
              h2, h3 {
                  color: #333;
              }
              ul {
                  list-style-type: none;
                  padding-left: 0;
              }
              li {
                  margin-bottom: 5px;
              }
                img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 10px 0;
                }
          </style>
          <title>Thông tin sản phẩm</title>
      </head>
      <body>
          ${content}
      </body>
      </html>
    `;
}