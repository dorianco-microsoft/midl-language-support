# MIDL Language Support for VS Code

Provides syntax highlighting and language support for Microsoft Interface Definition Language (MIDL/IDL) files used for COM, DCOM, and RPC interface definitions.

## Features

- **Syntax Highlighting** for `.midl`, `.idl`, and `.acf` files
- **Keyword Recognition** for all MIDL language keywords
- **Attribute Support** for interface, method, and parameter attributes
- **Type Highlighting** for built-in types and COM types
- **UUID/GUID Recognition** with special highlighting
- **Comment Support** for both line (`//`) and block (`/* */`) comments
- **Preprocessor Directives** highlighting (`#include`, `#define`, `#pragma`, etc.)
- **Smart Indentation** with bracket matching and auto-closing
- **Document Formatting** following Microsoft C++ style (Clang-format Microsoft preset)
  - 4-space indentation
  - Allman brace style (braces on new lines)
  - Proper spacing around operators and keywords
  - Intelligent blank line insertion between declarations
  - Multi-line attribute block formatting
  - Enum members on separate lines
  - Typedef aliases properly formatted
  - Use `Shift+Alt+F` or right-click > Format Document

## Supported File Extensions

| Extension | Description |
|-----------|-------------|
| `.midl` | Microsoft Interface Definition Language |
| `.idl` | Interface Definition Language |
| `.acf` | Application Configuration File |

## Language Elements

### Keywords
- Declaration: `interface`, `coclass`, `library`, `dispinterface`, `module`, `struct`, `union`, `enum`, `typedef`
- Control: `import`, `importlib`, `include`, `cpp_quote`

### Attributes
- Interface: `object`, `uuid`, `local`, `dual`, `oleautomation`, `pointer_default`
- Directional: `in`, `out`, `retval`
- Pointer: `ptr`, `ref`, `unique`, `string`, `iid_is`
- Array: `size_is`, `max_is`, `length_is`, `first_is`, `last_is`
- Type Library: `helpstring`, `id`, `propget`, `propput`, `default`, `source`
- And many more...

### Types
- Primitive: `boolean`, `byte`, `char`, `short`, `int`, `long`, `hyper`, `float`, `double`, `void`
- COM: `HRESULT`, `BSTR`, `VARIANT`, `SAFEARRAY`, `IUnknown`, `IDispatch`
- Windows: `DWORD`, `WORD`, `BOOL`, `GUID`, `CLSID`, `IID`

## Example

```idl
[
    object,
    uuid(12345678-1234-1234-1234-123456789ABC),
    dual,
    oleautomation,
    pointer_default(unique)
]
interface IMyInterface : IDispatch
{
    [propget, id(1)]
    HRESULT Name([out, retval] BSTR* pVal);

    [propput, id(1)]
    HRESULT Name([in] BSTR newVal);

    [id(2)]
    HRESULT DoSomething([in] long value, [out, retval] VARIANT* result);
};
```

## Formatting Style

The formatter follows **Microsoft C++ coding style** (Clang-format Microsoft preset):

- **4-space indentation** for consistency with Microsoft codebase standards
- **Allman brace style** - opening braces on new lines at the same indentation level
- **Intelligent spacing**:
  - Blank lines between member declarations for readability
  - Blank lines after top-level declarations
  - Space after control keywords (`if`, `for`, `while`)
  - Space after commas in parameter lists
  - No space before function parentheses
- **Attribute formatting**:
  - Single short attributes on one line: `[attribute]`
  - Multiple or long attributes on separate lines with proper indentation
- **Enum formatting** - each enum member on its own line
- **Typedef formatting** - closing brace and type aliases on the same line

## Documentation

For more information about MIDL, see:
- [MIDL Language Reference](https://learn.microsoft.com/en-us/windows/win32/Midl/midl-language-reference)
- [Anatomy of an IDL File](https://learn.microsoft.com/en-us/windows/win32/com/anatomy-of-an-idl-file)
- [MIDL Command-Line Reference](https://learn.microsoft.com/en-us/windows/win32/Midl/midl-command-line-reference)

## Release Notes

### 0.1.0

Initial release with comprehensive MIDL syntax highlighting support.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
