# Change Log

All notable changes to the "midl-language-support" extension will be documented in this file.

## [0.1.0] - 2024-12-01

### Added
- Initial release of MIDL Language Support
- Comprehensive syntax highlighting for `.midl`, `.idl`, and `.acf` files
- Support for all MIDL keywords: `interface`, `coclass`, `library`, `dispinterface`, `module`, `struct`, `union`, `enum`, `typedef`
- Highlighting for 150+ MIDL attributes including:
  - Interface attributes: `object`, `uuid`, `local`, `dual`, `oleautomation`, `pointer_default`
  - Directional attributes: `in`, `out`, `retval`
  - Pointer attributes: `ptr`, `ref`, `unique`, `string`, `iid_is`
  - Array attributes: `size_is`, `max_is`, `length_is`, `first_is`, `last_is`
  - Type library attributes: `helpstring`, `id`, `propget`, `propput`, `default`, `source`
  - ACF attributes: `auto_handle`, `implicit_handle`, `explicit_handle`, `encode`, `decode`
  - System handle attributes: `system_handle`, `sh_file`, `sh_pipe`, `sh_process`, etc.
- Built-in type recognition: `boolean`, `byte`, `char`, `short`, `int`, `long`, `hyper`, `float`, `double`, `void`, `wchar_t`
- COM type highlighting: `HRESULT`, `BSTR`, `VARIANT`, `SAFEARRAY`, `IUnknown`, `IDispatch`
- Windows type support: `DWORD`, `WORD`, `BOOL`, `GUID`, `CLSID`, `IID`
- UUID/GUID pattern matching with special highlighting
- Preprocessor directive support: `#include`, `#define`, `#pragma`, `#ifdef`, `#ifndef`, `#endif`
- Line and block comment highlighting
- Smart bracket matching and auto-closing
- Intelligent indentation rules
- Language configuration with folding support
- Keyword documentation with links to official Microsoft documentation
- Advanced document formatting following Microsoft C++ style (Clang-format Microsoft preset):
  - 4-space indentation (Microsoft standard)
  - Allman brace style - braces on new lines
  - Intelligent blank line insertion between declarations and members
  - Multi-line formatting for complex attribute blocks
  - Enum members automatically placed on separate lines
  - Typedef aliases properly formatted on closing brace line
  - Proper spacing around operators, keywords, and commas
  - Preprocessor directives at column 0
  - Block comment structure preservation
  - Use `Format Document` (Shift+Alt+F) or `Format Selection` commands