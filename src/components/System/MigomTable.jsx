import {
  Table as MaUTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { clsx } from "clsx";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { scrollStyles } from "../../theme/defaultStyles";

const useStyles = makeStyles((theme) => ({
  rowBody: {},
  table: {
    overflowX: "auto",

    ...scrollStyles({ color: theme.palette.primary.main }),

    "@global": {
      th: {
        position: "sticky",
        top: 0,
        backgroundColor: "transparent",
        zIndex: 1000,
      },
      "th, td": {
        cursor: "default",
        fontSize: ".85rem",
      },
      // "tbody tr:nth-child(even)": {
      //   backgroundColor: "#f2f2f2",
      // },
    },
  },
}));

const MigomTable = memo(
  ({
    columns,
    data,
    customClasses,
    pageCount: controlledPageCount,
    onRowClick,
    selectedItems,
    makeRowClass,
    onCell,
    customSort,
    autoHeight,
    useScrollable,
    renderChild,
    customStyle,
    currentPageIndex,
  }) => {
    const classes = useStyles();

    const config = {
      columns,
      data,
      initialState: { pageIndex: currentPageIndex || 0 },
      manualPagination: true,
      manualSortBy: true,
      pageCount: controlledPageCount,
    };

    const useControlledState = (state) => {
      return useMemo(
        () => ({
          ...state,
          pageIndex: currentPageIndex,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state, currentPageIndex]
      );
    };

    if (currentPageIndex >= 0) {
      config.useControlledState = useControlledState;
    }

    const { getTableProps, headerGroups, rows, prepareRow, state } = useTable(
      config,
      useSortBy,
      usePagination
    );

    const { sortBy } = state;

    useEffect(() => {
      if (customSort) {
        if (sortBy?.length > 0) {
          customSort({
            sortBy: sortBy?.[0]?.id,
            sortDirection: sortBy?.[0]?.desc ? "desc" : "asc",
          });
        } else {
          customSort();
        }
      }
    }, [customSort, sortBy]);

    const makeHeadRows = headerGroups.map((headerGroup, index) => {
      const makeCells = headerGroup.headers.map((column, indx) => {
        const columnAsAny = column;
        const toggleSort = columnAsAny.getSortByToggleProps();

        return (
          <TableCell
            {...columnAsAny.getHeaderProps([
              {
                id: columnAsAny.id,
                className: columnAsAny.classNameHead,
                style: {
                  whiteSpace: "nowrap",
                  fontWeight: 700,
                  borderBottom: 0,
                  padding: "8px 16px",
                  fontSize: ".75rem",
                  letterSpacing: "0.04em",
                  ...(columnAsAny.styleHead || {}),
                  cursor: toggleSort?.style?.cursor || "default",
                  zIndex: 0,
                },
                onClick: toggleSort?.onClick,
              },
            ])}
            key={indx}
          >
            <>
              {columnAsAny.render("Header")}
              <span>
                {columnAsAny.isSorted
                  ? columnAsAny.isSortedDesc
                    ? " 🔽"
                    : " 🔼"
                  : ""}
              </span>
            </>
          </TableCell>
        );
      });

      return (
        <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
          {makeCells}
        </TableRow>
      );
    });

    const makeBodyRows = rows.map((row, i) => {
      prepareRow(row);

      const makeCells = row.cells.map((cell, indx) => {
        let onClick;

        if (cell.column?.onCell) {
          onClick = cell.column.onCell;
        }

        if (onCell) {
          onClick = () => {
            onCell(cell);
          };
        }

        const column = cell.column;

        return (
          <TableCell
            {...cell.getCellProps([
              {
                className: column.className,
                style: {
                  padding: "8px 16px",
                  /* borderBottom: 0, */
                  ...(column.style || {}),
                  cursor: onRowClick || onCell ? "pointer" : "default",
                  color: "inherit",
                },
              },
            ])}
            key={indx}
            onClick={onClick}
          >
            {cell.render("Cell")}
          </TableCell>
        );
      });

      const findItem = (selectedItems || []).find((item) => {
        return item.id === row.original?.id;
      });

      return (
        <React.Fragment key={i}>
          <TableRow
            {...row.getRowProps([
              {
                className: clsx(
                  classes.rowBody,
                  makeRowClass ? makeRowClass(row.original, i) : null,
                  Boolean(findItem) && customClasses?.rowActive
                ),
                onClick: onRowClick
                  ? () => onRowClick(row.original, i)
                  : undefined,
                style: { cursor: onRowClick ? "pointer" : "default" },
              },
            ])}
          >
            {makeCells}
          </TableRow>

          {renderChild && renderChild(row, i)}
        </React.Fragment>
      );
    });

    const [style, setStyle] = useState({});

    const onResize = useCallback(() => {
      const elements = document.querySelectorAll(`.${classes.table}`);
      if (!autoHeight && elements?.length === 1) {
        setStyle((prevState) => ({
          ...prevState,
          height:
            window.innerHeight - elements[0]?.getBoundingClientRect().top - 100,
        }));
      }
    }, [autoHeight, classes.table]);

    useEffect(() => {
      onResize();
    }, [onResize]);

    useEffect(() => {
      window.addEventListener("resize", onResize, false);

      return () => {
        window.removeEventListener("resize", onResize, false);
      };
    }, [onResize]);

    return (
      <>
        <div
          className={classes.table}
          style={
            autoHeight
              ? { ...customStyle }
              : {
                  ...(useScrollable ? style : {}),
                  minHeight: 300,
                  ...customStyle,
                }
          }
        >
          <MaUTable {...getTableProps()}>
            <TableHead>{makeHeadRows}</TableHead>
            <TableBody>{makeBodyRows}</TableBody>
          </MaUTable>
        </div>

        <div className="h-2.5" />
      </>
    );
  }
);

export default MigomTable;
