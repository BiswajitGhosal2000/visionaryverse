import { Paper, Skeleton, Table, TableBody, TableHead, TableRow } from '@mui/material'
import React from 'react'

function UserBlogItemSkeleton() {
    return (
        <Paper elevation={3} sx={{ width: '100%', }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <Skeleton animation='pulse' variant='rectangular' height={60} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <Skeleton animation='wave' variant='rectangular' height={40} />
                    </TableRow>
                    <TableRow>
                        <Skeleton animation='pulse' variant='rectangular' height={40} />
                    </TableRow>
                    <TableRow>
                        <Skeleton animation='wave' variant='rectangular' height={40} />
                    </TableRow>
                    <TableRow>
                        <Skeleton animation='pulse' variant='rectangular' height={40} />
                    </TableRow>
                    <TableRow>
                        <Skeleton animation='wave' variant='rectangular' height={40} />
                    </TableRow>
                    <TableRow>
                        <Skeleton animation='pulse' variant='rectangular' height={40} />
                    </TableRow>
                    <TableRow>
                        <Skeleton animation='wave' variant='rectangular' height={40} />
                    </TableRow>
                    <TableRow>
                        <Skeleton animation='pulse' variant='rectangular' height={40} />
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    )
}

export default UserBlogItemSkeleton